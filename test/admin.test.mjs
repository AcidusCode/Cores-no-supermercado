import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequestPost as login} from '../functions/api/admin/login.js';
import {onRequestPost as logout} from '../functions/api/admin/logout.js';
import {onRequestGet as list} from '../functions/api/admin/responses.js';
import {createFakeD1, validInput} from './helpers/fake-d1.mjs';
import {onRequestPost as submit} from '../functions/api/responses.js';

const PASSWORD = 'correct horse battery';
const url = path => `https://site.test${path}`;
const loginReq = (body, headers = {}) => new Request(url('/api/admin/login'), {
  method: 'POST', headers: {'content-type': 'application/json', ...headers},
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

async function authCookie(env) {
  const res = await login({request: loginReq({password: PASSWORD}), env});
  return res.headers.get('set-cookie').split(';')[0];
}

test('login succeeds with the right password and sets a hardened cookie', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD};
  const res = await login({request: loginReq({password: PASSWORD}), env});
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {ok: true});
  const cookie = res.headers.get('set-cookie');
  assert.match(cookie, /^cores_admin=\d+\.[a-f0-9]{64}; HttpOnly; SameSite=Strict; Path=\/api\/admin; Max-Age=28800; Secure$/);
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
});

test('login rejects wrong or non-string passwords with 401', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD};
  for (const body of [{password: 'nope'}, {password: 123}, {}]) {
    const res = await login({request: loginReq(body), env});
    assert.equal(res.status, 401);
    assert.deepEqual(await res.json(), {ok: false});
    assert.equal(res.headers.get('set-cookie'), null);
  }
});

test('login rejects malformed JSON and cross-origin requests', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD};
  assert.equal((await login({request: loginReq('{bad'), env})).status, 400);
  assert.equal((await login({request: loginReq({password: PASSWORD}, {origin: 'https://evil.test'}), env})).status, 403);
});

test('admin endpoints return 500 when ADMIN_PASSWORD is missing or short', async () => {
  for (const env of [{}, {ADMIN_PASSWORD: 'short'}]) {
    env.DB = createFakeD1();
    const a = await login({request: loginReq({password: 'short'}), env});
    const b = await logout({request: new Request(url('/api/admin/logout'), {method: 'POST'}), env});
    const c = await list({request: new Request(url('/api/admin/responses')), env});
    for (const res of [a, b, c]) {
      assert.equal(res.status, 500);
      assert.deepEqual(await res.json(), {ok: false});
    }
  }
});

test('logout clears the cookie', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD};
  const res = await logout({request: new Request(url('/api/admin/logout'), {method: 'POST'}), env});
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {ok: true});
  assert.equal(res.headers.get('set-cookie'), 'cores_admin=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0; Secure');
});

test('GET responses requires a valid session', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD, DB: createFakeD1()};
  for (const headers of [{}, {cookie: 'cores_admin=1.' + '0'.repeat(64)}, {cookie: 'cores_admin=garbage'}]) {
    const res = await list({request: new Request(url('/api/admin/responses'), {headers}), env});
    assert.equal(res.status, 401);
    assert.deepEqual(await res.json(), {ok: false});
  }
});

test('GET responses returns parsed payloads ordered by submitted_at DESC', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD, DB: createFakeD1()};
  const insert = env.DB.raw.prepare('INSERT INTO participations VALUES (?,?,?,?)');
  insert.run('a', '2025-01-01T00:00:00.000Z', 'pt', JSON.stringify({participant: 'a'}));
  insert.run('c', '2025-03-01T00:00:00.000Z', 'en', JSON.stringify({participant: 'c'}));
  insert.run('b', '2025-02-01T00:00:00.000Z', 'es', JSON.stringify({participant: 'b'}));
  const cookie = await authCookie(env);
  const res = await list({request: new Request(url('/api/admin/responses'), {headers: {cookie}}), env});
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {records: [{participant: 'c'}, {participant: 'b'}, {participant: 'a'}]});
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

test('end to end: a submitted response shows up for an authenticated admin', async () => {
  const env = {ADMIN_PASSWORD: PASSWORD, DB: createFakeD1()};
  await submit({request: new Request(url('/api/responses'), {method: 'POST', body: JSON.stringify(validInput())}), env});
  const cookie = await authCookie(env);
  const res = await list({request: new Request(url('/api/admin/responses'), {headers: {cookie}}), env});
  const {records} = await res.json();
  assert.equal(records.length, 1);
  assert.equal(records[0].participant, '123e4567-e89b-12d3-a456-426614174000');
});
