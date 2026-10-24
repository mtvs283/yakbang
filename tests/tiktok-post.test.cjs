const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
}).outputText, filename);
const load = () => require('../lib/tiktok-post.ts');
test('posting rejects public visibility and missing affirmative consent in sandbox', () => {
  const { validatePost } = load();
  const valid = { title: '학습 카드', description: '', privacy: 'SELF_ONLY', consent: true, comments: false,
    music: false, aigc: false, commercial: false, ownBrand: false, branded: false, cover: 0, images: ['ticket'], requestId: '8f83f992-3e2c-4be2-904a-27a0d16e0ee7' };
  assert.doesNotThrow(() => validatePost(valid, { privacy_level_options: ['SELF_ONLY'], comment_disabled: false }));
  for (const patch of [{ privacy: 'PUBLIC_TO_EVERYONE' }, { consent: false }, { images: [] }, { images: Array(36).fill('x') },
    { cover: 1 }, { title: 'x'.repeat(91) }, { commercial: true }, { commercial: true, branded: true }, { comments: 'yes' }]) {
    assert.throws(() => validatePost({ ...valid, ...patch }, { privacy_level_options: ['SELF_ONLY'], comment_disabled: false }));
  }
  assert.throws(() => validatePost({ ...valid, comments: true }, { privacy_level_options: ['SELF_ONLY'], comment_disabled: true }));
});
test('image tickets reject another account, wrong purpose, tampering and expiry', () => {
  const { imageTicket, readImageTicket } = load();
  const secret = 'x'.repeat(64), owner = 'a'.repeat(64), path = `${owner}/8f83f992-3e2c-4be2-904a-27a0d16e0ee7.jpg`;
  const ticket = imageTicket(path, owner, secret);
  assert.equal(readImageTicket(ticket, secret, owner).path, path);
  assert.throws(() => readImageTicket(ticket, secret, 'b'.repeat(64)));
  assert.throws(() => readImageTicket(ticket.slice(5), secret, owner));
  const { seal } = require('../lib/tiktok.ts');
  assert.throws(() => readImageTicket(seal({ kind: 'job', path, owner, expiresAt: Date.now() + 10000 }, secret), secret, owner));
  assert.throws(() => readImageTicket(seal({ kind: 'image', path, owner, expiresAt: 1 }, secret), secret, owner));
});
test('image validation rejects HTML disguised as JPEG and oversized images', () => {
  const { validateJpeg } = load();
  assert.throws(() => validateJpeg(Buffer.from('<html>not jpeg</html>')));
  assert.throws(() => validateJpeg(Buffer.alloc(4 * 1024 * 1024)));
  // Minimal JPEG frame structure, sufficient for checking dimensions, not an image fixture for decoding.
  const frame = Buffer.from([255,216,255,192,0,11,8,7,128,4,56,1,1,17,0,255,217]);
  assert.deepEqual(validateJpeg(frame), { width:1080, height:1920 });
  frame[9] = 16;
  assert.throws(() => validateJpeg(frame));
});
