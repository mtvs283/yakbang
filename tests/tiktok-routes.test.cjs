const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Compile only this test process's TypeScript imports; production uses Next.js.
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(
  fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }
).outputText, filename);
const { NextRequest } = require('next/server');
const connect = require('../app/api/tiktok/connect/route.ts');
const callback = require('../app/api/tiktok/callback/route.ts');
const disconnect = require('../app/api/tiktok/disconnect/route.ts');
const refresh = require('../app/api/tiktok/refresh/route.ts');
const { STATE_COOKIE, SESSION_COOKIE, readSession, seal } = require('../lib/tiktok.ts');
const secret = 'b'.repeat(64);
Object.assign(process.env, { TIKTOK_CLIENT_KEY: 'key', TIKTOK_CLIENT_SECRET: 'secret',
  TIKTOK_REDIRECT_URI: 'https://example.com/api/tiktok/callback', TIKTOK_SESSION_SECRET: secret,
  TIKTOK_CONNECT_PASSWORD: 'strong-test-password-32-characters' });
function post(path, origin = 'https://example.com', password = process.env.TIKTOK_CONNECT_PASSWORD, cookie = '') {
  return new NextRequest(`https://example.com${path}`, { method: 'POST', headers: {
    origin, 'Content-Type': 'application/x-www-form-urlencoded', cookie
  }, body: new URLSearchParams({ password }) });
}
test('connect rejects foreign origins and incorrect passwords', async () => {
  assert.equal((await connect.POST(post('/api/tiktok/connect', 'https://attacker.test'))).status, 403);
  const denied = await connect.POST(post('/api/tiktok/connect', undefined, 'wrong'));
  assert.match(denied.headers.get('location'), /result=password/);
  assert.equal(denied.cookies.get(STATE_COOKIE), undefined);
});
test('login callback checks state before exchange, stores no plaintext tokens, then clears state', async () => {
  const original = global.fetch;
  let calls = 0;
  try {
    global.fetch = async () => { calls++; return Response.json({ access_token: 'access-secret', refresh_token: 'refresh-secret',
      open_id: 'operator', scope: 'user.info.basic,video.publish', expires_in: 86400, refresh_expires_in: 31536000 }); };
    const start = await connect.POST(post('/api/tiktok/connect'));
    const auth = new URL(start.headers.get('location'));
    assert.equal(auth.origin, 'https://www.tiktok.com');
    assert.equal(auth.searchParams.get('scope'), 'user.info.basic,video.publish');
    const stateCookie = start.cookies.get(STATE_COOKIE).value;
    assert.match(start.headers.get('set-cookie'), /HttpOnly/i);
    assert.match(start.headers.get('set-cookie'), /Secure/i);
    const callbackReq = state => new NextRequest(`https://example.com/api/tiktok/callback?code=test&state=${state}`, {
      headers: { cookie: `${STATE_COOKIE}=${stateCookie}` }
    });
    const bad = await callback.GET(callbackReq('forged'));
    assert.match(bad.headers.get('location'), /result=state/);
    assert.equal(calls, 0);
    const good = await callback.GET(callbackReq(auth.searchParams.get('state')));
    assert.match(good.headers.get('location'), /result=connected/);
    assert.equal(calls, 1);
    assert.equal(good.cookies.get(STATE_COOKIE).value, '');
    assert.ok(!good.headers.get('set-cookie').includes('access-secret'));
    assert.equal(readSession(good.cookies.get(SESSION_COOKIE).value, secret).openId, 'operator');
    assert.equal(good.headers.get('cache-control'), 'no-store');
    const cancelled = await callback.GET(new NextRequest(`https://example.com/api/tiktok/callback?error=access_denied&state=${auth.searchParams.get('state')}`, {
      headers: { cookie: `${STATE_COOKIE}=${stateCookie}` }
    }));
    assert.match(cancelled.headers.get('location'), /result=cancelled/);
    assert.equal(calls, 1);
  } finally { global.fetch = original; }
});
test('refresh rejects wrong origin; disconnect clears local credentials even if provider fails', async () => {
  assert.equal((await refresh.POST(post('/api/tiktok/refresh', 'https://attacker.test'))).status, 403);
  assert.equal((await disconnect.POST(post('/api/tiktok/disconnect', 'https://attacker.test'))).status, 403);
  const expired = await refresh.POST(post('/api/tiktok/refresh'));
  assert.match(expired.headers.get('location'), /result=expired/);
  const data = { accessToken: 'access', refreshToken: 'refresh', openId: 'operator', scope: 'video.publish',
    expiresAt: Date.now() + 10000, refreshExpiresAt: Date.now() + 20000 };
  const cookie = `${SESSION_COOKIE}=${seal(data, secret)}`;
  const original = global.fetch;
  try {
    global.fetch = async () => { throw new Error('offline'); };
    const response = await disconnect.POST(post('/api/tiktok/disconnect', undefined, undefined, cookie));
    assert.match(response.headers.get('location'), /result=revoke_failed/);
    assert.equal(response.cookies.get(SESSION_COOKIE).value, '');
  } finally { global.fetch = original; }
});
