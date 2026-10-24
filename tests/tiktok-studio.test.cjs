const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
}).outputText, filename);
const { NextRequest } = require('next/server');
const { seal, SESSION_COOKIE } = require('../lib/tiktok.ts');
const { imageTicket, ownerKey } = require('../lib/tiktok-post.ts');
const provider = require('../lib/tiktok-storage.ts');
const studio = require('../app/api/tiktok/studio/route.ts');
const media = require('../app/api/tiktok/media/route.ts');
const secret = 's'.repeat(64), owner = ownerKey('operator');
Object.assign(process.env, { TIKTOK_CLIENT_KEY: 'key', TIKTOK_CLIENT_SECRET: 'client-secret',
  TIKTOK_REDIRECT_URI: 'https://example.com/api/tiktok/callback', TIKTOK_SESSION_SECRET: secret,
  TIKTOK_CONNECT_PASSWORD: 'private-operator-password' });
const session = seal({ accessToken: 'private-access', refreshToken: 'private-refresh', openId: 'operator',
  scope: 'user.info.basic,video.publish', expiresAt: Date.now() + 86400000, refreshExpiresAt: Date.now() + 172800000 }, secret);
function request(action, input, { origin = 'https://example.com', cookie = session, type = 'application/json' } = {}) {
  return new NextRequest(`https://example.com/api/tiktok/studio?action=${action}`, { method:'POST',
    headers: { origin, cookie: cookie ? `${SESSION_COOKIE}=${cookie}` : '', 'Content-Type': type },
    body: input instanceof Buffer ? input : JSON.stringify(input || {}) });
}
function setup() {
  const objects = new Map(); let inits = 0; let initBody; let mode = 'success';
  const bucket = {
    download: async path => objects.has(path) ? { data: new Blob([objects.get(path)]), error:null } : { data:null, error:{status:404} },
    upload: async (path, data, options) => {
      if (objects.has(path) && !options.upsert) return {error:{status:409}};
      objects.set(path, data); return { data:{path}, error:null };
    },
    info: async path => ({ error: objects.has(path) ? null : {status:404} }),
    remove: async paths => { paths.forEach(p => objects.delete(p)); return {error:null}; }
  };
  const old = { fetch:global.fetch, ensure:provider.ensureBucket, storage:provider.storage, clean:provider.cleanOldImages };
  provider.ensureBucket = async () => bucket;
  provider.storage = () => ({ from: () => bucket });
  provider.cleanOldImages = async () => {};
  global.fetch = async (url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer private-access');
    if (url.includes('creator_info')) return Response.json({data:{creator_nickname:'TK샘',creator_username:'tk_ssam',
      privacy_level_options:['PUBLIC_TO_EVERYONE','SELF_ONLY'],comment_disabled:false}, error:{code:'ok'}});
    if (url.includes('content/init')) {
      inits++; initBody = JSON.parse(options.body);
      if (mode === 'timeout') throw new Error('timeout');
      if (mode === 'server-error') return Response.json({error:{code:'internal_error'}}, {status:503});
      if (mode === 'reject') return Response.json({error:{code:'unaudited_client_can_only_post_to_private_accounts'}}, {status:403});
      return Response.json({data:{publish_id:'post-1'},error:{code:'ok'}});
    }
    return Response.json({data:{status:'PUBLISH_COMPLETE'},error:{code:'ok'}});
  };
  return {objects, get inits(){return inits}, get initBody(){return initBody}, setMode(value){mode=value},
    restore(){global.fetch=old.fetch;provider.ensureBucket=old.ensure;provider.storage=old.storage;provider.cleanOldImages=old.clean} };
}
function input(objects) {
  const path = `${owner}/8f83f992-3e2c-4be2-904a-27a0d16e0ee7.jpg`; objects.set(path, Buffer.from('jpeg'));
  return {title:'카드뉴스',description:'#한국어',privacy:'SELF_ONLY',consent:true,comments:false,music:false,aigc:true,
    commercial:false,ownBrand:false,branded:false,cover:0,images:[imageTicket(path,owner,secret)],requestId:'dfa3ebd1-26f9-4a67-9301-061919a054d1'};
}
test('unauthenticated and cross-origin publish/upload requests never reach TikTok or storage', async () => {
  const h=setup();try {
    assert.equal((await studio.POST(request('publish',{}, {cookie:''}))).status,401);
    assert.equal((await studio.POST(request('upload',{}, {origin:'https://attacker.test'}))).status,403);
    assert.equal(h.inits,0);assert.equal(h.objects.size,0);
  }finally{h.restore()}
});
test('server preserves photo order/cover/settings and deduplicates concurrent submission; status cleans images', async () => {
  const h=setup();try {
    const data=input(h.objects);
    const second=`${owner}/e3e59bc8-c523-46c5-8816-a5d5c5e610cd.jpg`;h.objects.set(second,Buffer.from('second'));
    data.images.unshift(imageTicket(second,owner,secret));data.cover=1;
    const results=await Promise.all([studio.POST(request('publish',data)),studio.POST(request('publish',data))]);
    for(const response of results){assert.equal(response.status,200);assert.ok(!JSON.stringify(await response.json()).includes('private-access'))}
    assert.equal(h.inits,1);
    assert.equal(h.initBody.media_type,'PHOTO');assert.equal(h.initBody.post_mode,'DIRECT_POST');assert.equal(h.initBody.is_aigc,true);
    assert.equal(h.initBody.post_info.privacy_level,'SELF_ONLY');assert.equal(h.initBody.post_info.disable_comment,true);
    assert.equal(h.initBody.source_info.photo_cover_index,1);
    assert.equal(new URL(h.initBody.source_info.photo_images[0]).origin,'https://example.com');
    assert.equal(new URL(h.initBody.source_info.photo_images[0]).searchParams.get('ticket'),data.images[0]);
    const status=await studio.POST(request('status',{requestId:data.requestId}));
    assert.equal((await status.json()).status,'PUBLISH_COMPLETE');
    assert.equal([...h.objects.keys()].filter(p=>p.endsWith('.jpg')).length,0);
  }finally{h.restore()}
});
test('ambiguous timeout and server error never initialize again on retry', async () => {
  for(const mode of ['timeout','server-error']) {
    const h=setup();try {
      h.setMode(mode);const data=input(h.objects);
      const first=await studio.POST(request('publish',data));assert.equal((await first.json()).state,'uncertain');
      await studio.POST(request('publish',data));assert.equal(h.inits,1);
      assert.equal((await (await studio.POST(request('status',{requestId:data.requestId}))).json()).state,'uncertain');
    }finally{h.restore()}
  }
});
test('public visibility is rejected before initialization; TikTok private-account error remains a rejection', async () => {
  const h=setup();try {
    const data=input(h.objects);
    const rejected=await studio.POST(request('publish',{...data,privacy:'PUBLIC_TO_EVERYONE'}));
    assert.equal(rejected.status,400);assert.equal((await rejected.json()).safeToRetry,true);assert.equal(h.inits,0);
    h.setMode('reject');const response=await studio.POST(request('publish',data));
    const result=await response.json();assert.equal(result.state,'rejected');assert.match(result.error,/비공개/);
  }finally{h.restore()}
});
test('image upload yields scoped capability; proxy needs valid ticket and never exposes storage credentials', async () => {
  const h=setup();try {
    const bytes=Buffer.from([255,216,255,192,0,11,8,7,128,4,56,1,1,17,0,255,217]);
    const uploaded=await studio.POST(request('upload',bytes,{type:'image/jpeg'}));assert.equal(uploaded.status,200);
    const {ticket}=await uploaded.json();
    const response=await media.GET(new NextRequest(`https://example.com/api/tiktok/media?ticket=${ticket}`));
    assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'image/jpeg');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()),bytes);
    assert.equal((await media.GET(new NextRequest('https://example.com/api/tiktok/media?ticket=forged'))).status,403);
  }finally{h.restore()}
});
