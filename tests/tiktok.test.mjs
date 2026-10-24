import test from 'node:test';
import assert from 'node:assert/strict';
import { config, equal, seal, unseal, readSession, tokenRequest } from '../lib/tiktok.ts';

const secret = 'a'.repeat(64);
Object.assign(process.env, {
  TIKTOK_CLIENT_KEY: 'test-key', TIKTOK_CLIENT_SECRET: 'test-client-secret',
  TIKTOK_REDIRECT_URI: 'https://example.com/api/tiktok/callback',
  TIKTOK_SESSION_SECRET: secret, TIKTOK_CONNECT_PASSWORD: 'test-password-32-characters-long'
});

test('encrypted session cannot be read or altered without the secret', () => {
  const data = { accessToken: 'private-token', refreshToken: 'private-refresh', openId: 'id',
    scope: 'user.info.basic,video.publish', expiresAt: Date.now() + 10000, refreshExpiresAt: Date.now() + 20000 };
  const encoded = seal(data, secret);
  assert.ok(!encoded.includes('private-token'));
  assert.deepEqual(readSession(encoded, secret), data);
  assert.equal(unseal(encoded, 'wrong-secret'), null);
  const bytes = Buffer.from(encoded, 'base64url'); bytes[30] ^= 1;
  assert.equal(unseal(bytes.toString('base64url'), secret), null);
  assert.equal(readSession(seal({ ...data, refreshExpiresAt: 1 }, secret), secret), null);
  assert.equal(readSession(seal({ state: 'not-a-session' }, secret), secret), null);
  assert.throws(() => seal({ value: 'x'.repeat(4000) }, secret));
});

test('state comparison and redirect validation fail closed', () => {
  assert.ok(equal('state-a', 'state-a'));
  assert.ok(!equal('state-a', 'state-b'));
  assert.equal(config().origin, 'https://example.com');
  const original = process.env.TIKTOK_REDIRECT_URI;
  for (const value of ['http://example.com/api/tiktok/callback', 'https://example.com/', 'https://example.com/api/tiktok/callback?x=1']) {
    process.env.TIKTOK_REDIRECT_URI = value;
    assert.throws(() => config());
  }
  process.env.TIKTOK_REDIRECT_URI = original;
});

test('token exchange sends credentials only to TikTok and preserves rotated refresh tokens', async () => {
  const original = global.fetch;
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://open.tiktokapis.com/v2/oauth/token/');
      assert.equal(options.body.get('grant_type'), 'refresh_token');
      assert.equal(options.body.get('refresh_token'), 'old-refresh');
      assert.equal(options.body.get('client_secret'), 'test-client-secret');
      return Response.json({ access_token: 'new-access', refresh_token: 'rotated-refresh', open_id: 'id',
        scope: 'video.publish', expires_in: 86400, refresh_expires_in: 31536000 });
    };
    const data = await tokenRequest({ grant_type: 'refresh_token', refresh_token: 'old-refresh' });
    assert.equal(data.refreshToken, 'rotated-refresh');
    assert.ok(data.expiresAt > Date.now());
    global.fetch = async () => Response.json({ error: 'invalid_grant' });
    await assert.rejects(tokenRequest({ code: 'bad' }));
    global.fetch = async () => Response.json({ access_token: 'incomplete' });
    await assert.rejects(tokenRequest({ code: 'bad' }));
  } finally { global.fetch = original; }
});
