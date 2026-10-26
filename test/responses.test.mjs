import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequestGet as statusGet} from '../functions/api/status.js';
import {onRequestPost as submit} from '../functions/api/responses.js';
import {createFakeD1, validInput} from './helpers/fake-d1.mjs';

const post = (body, headers = {}) => new Request('https://site.test/api/responses', {
  method: 'POST',
  headers: {'content-type': 'text/plain;charset=utf-8', ...headers},
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
const rows = env => env.DB.raw.prepare('SELECT * FROM participations').all();

test('GET /api/status reports sqlite storage', async () => {
  const res = await statusGet({request: new Request('https://site.test/api/status'), env: {}});
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {storage: 'sqlite'});
  assert.equal(res.headers.get('cache-control'), 'no-store');
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
});

test('POST /api/responses stores a validated record', async () => {
  const env = {DB: createFakeD1()};
  const res = await submit({request: post(validInput()), env});
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {ok: true});
  assert.equal(res.headers.get('cache-control'), 'no-store');
  const [row] = rows(env);
  assert.equal(row.participant, '123e4567-e89b-12d3-a456-426614174000');
  assert.equal(row.language, 'pt');
  assert.equal(JSON.parse(row.payload).answers.length, 7);
});

test('POST /api/responses stores an Italian record', async () => {
  const env = {DB: createFakeD1()};
  const res = await submit({request: post(validInput({language: 'it'})), env});
  assert.equal(res.status, 200);
  const [row] = rows(env);
  assert.equal(row.language, 'it');
  assert.equal(JSON.parse(row.payload).language, 'it');
});

test('POST /api/responses is idempotent per participant', async () => {
  const env = {DB: createFakeD1()};
  await submit({request: post(validInput()), env});
  const res = await submit({request: post(validInput()), env});
  assert.equal(res.status, 200);
  assert.equal(rows(env).length, 1);
});

test('POST /api/responses rejects wrong action, invalid records and bad JSON with 400', async () => {
  const env = {DB: createFakeD1()};
  for (const body of [validInput({action: 'other'}), validInput({consent: false}), validInput({answers: []}), '{nope', 'null']) {
    const res = await submit({request: post(body), env});
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), {ok: false});
  }
  assert.equal(rows(env).length, 0);
});

test('POST /api/responses rejects bodies over 65536 bytes', async () => {
  const env = {DB: createFakeD1()};
  const res = await submit({request: post(JSON.stringify(validInput({version: 'x'.repeat(70000)}))), env});
  assert.equal(res.status, 400);
  assert.equal(rows(env).length, 0);
});

test('POST /api/responses enforces same-origin when Origin is present', async () => {
  const env = {DB: createFakeD1()};
  const bad = await submit({request: post(validInput(), {origin: 'https://evil.test'}), env});
  assert.equal(bad.status, 403);
  assert.deepEqual(await bad.json(), {ok: false});
  const garbage = await submit({request: post(validInput(), {origin: 'not a url'}), env});
  assert.equal(garbage.status, 403);
  const good = await submit({request: post(validInput(), {origin: 'https://site.test'}), env});
  assert.equal(good.status, 200);
  assert.equal(rows(env).length, 1);
});

test('POST /api/responses stores profile and comments in payload on the 0001-only schema', async () => {
  const env = {DB: createFakeD1()};
  assert.deepEqual(env.DB.raw.prepare("PRAGMA table_info('participations')").all().map(c => c.name), ['participant', 'submitted_at', 'language', 'payload']);
  const profile = {age: 40, country: 'BR', gender: 'outro', frequency: 'mensal', marketTypes: ['mercado_fresco']};
  const input = validInput({profile});
  input.answers[2].comment = ' gosto do cheiro ';
  const res = await submit({request: post(input), env});
  assert.equal(res.status, 200);
  const [row] = rows(env);
  const payload = JSON.parse(row.payload);
  assert.deepEqual(payload.profile, profile);
  assert.equal(payload.answers[2].comment, 'gosto do cheiro');
  assert.equal(env.DB.raw.prepare("SELECT json_extract(payload,'$.profile.age') AS age FROM participations").get().age, 40);
});

test('POST /api/responses without profile (old client) still works and stores profile null in payload', async () => {
  const env = {DB: createFakeD1()};
  assert.equal((await submit({request: post(validInput()), env})).status, 200);
  assert.equal(JSON.parse(rows(env)[0].payload).profile, null);
});

test('POST /api/responses rejects a malformed profile with 400', async () => {
  const env = {DB: createFakeD1()};
  const res = await submit({request: post(validInput({profile: {age: 17}})), env});
  assert.equal(res.status, 400);
  assert.equal(rows(env).length, 0);
});
