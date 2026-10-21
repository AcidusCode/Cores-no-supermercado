import test from 'node:test';
import assert from 'node:assert/strict';
import {
  adminConfigured, passwordMatches, issueToken, verifyToken,
  isAuthorized, sessionCookie, clearCookie,
} from '../functions/_lib/auth.js';

const env = {ADMIN_PASSWORD: 'correct horse battery'};

test('adminConfigured requires a password of at least 12 chars', () => {
  assert.equal(adminConfigured({}), false);
  assert.equal(adminConfigured({ADMIN_PASSWORD: 'short'}), false);
  assert.equal(adminConfigured(env), true);
});

test('passwordMatches compares against env.ADMIN_PASSWORD', async () => {
  assert.equal(await passwordMatches('correct horse battery', env), true);
  assert.equal(await passwordMatches('wrong', env), false);
  assert.equal(await passwordMatches(undefined, env), false);
});

test('token is <expiryMs>.<hex hmac> and verifies before expiry', async () => {
  const now = 1_000_000;
  const token = await issueToken(env, now);
  assert.match(token, /^\d+\.[a-f0-9]{64}$/);
  assert.equal(Number(token.split('.')[0]), now + 8 * 3600 * 1000);
  assert.equal(await verifyToken(token, env, now + 1000), true);
  assert.equal(await verifyToken(token, env, now + 8 * 3600 * 1000 + 1), false);
});

test('verifyToken rejects tampering, other secrets and garbage', async () => {
  const now = 5_000;
  const token = await issueToken(env, now);
  const [exp, sig] = token.split('.');
  assert.equal(await verifyToken(`${Number(exp) + 1}.${sig}`, env, now), false);
  assert.equal(await verifyToken(`${exp}.${'0'.repeat(64)}`, env, now), false);
  assert.equal(await verifyToken(token, {ADMIN_PASSWORD: 'another password!!'}, now), false);
  for (const bad of ['', 'abc', 'a.b', undefined, null, `${exp}.`, '.x']) {
    assert.equal(await verifyToken(bad, env, now), false);
  }
});

test('isAuthorized reads the cores_admin cookie', async () => {
  const token = await issueToken(env);
  const ok = new Request('https://x.test/api/admin/responses', {headers: {cookie: `a=b; cores_admin=${token}`}});
  const none = new Request('https://x.test/api/admin/responses');
  assert.equal(await isAuthorized(ok, env), true);
  assert.equal(await isAuthorized(none, env), false);
});

test('cookie helpers set the required attributes', () => {
  assert.equal(sessionCookie('tok'), 'cores_admin=tok; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=28800; Secure');
  assert.equal(clearCookie(), 'cores_admin=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0; Secure');
});
