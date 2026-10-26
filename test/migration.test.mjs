import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';

const root = new URL('../', import.meta.url);

test('migration creates the participations table with the expected schema', async () => {
  const sql = await readFile(new URL('migrations/0001_init.sql', root), 'utf8');
  const db = new DatabaseSync(':memory:');
  db.exec(sql);
  const cols = db.prepare("PRAGMA table_info('participations')").all();
  assert.deepEqual(cols.map(c => [c.name, c.type, c.notnull, c.pk]), [
    ['participant', 'TEXT', 0, 1],
    ['submitted_at', 'TEXT', 1, 0],
    ['language', 'TEXT', 1, 0],
    ['payload', 'TEXT', 1, 0],
  ]);
  db.close();
});

test('wrangler.toml declares the Pages project and the DB binding', async () => {
  const toml = await readFile(new URL('wrangler.toml', root), 'utf8');
  assert.match(toml, /^name\s*=\s*"cores-no-supermercado"/m);
  assert.match(toml, /^pages_build_output_dir\s*=\s*"dist"/m);
  assert.match(toml, /^compatibility_date\s*=\s*"2025-01-01"/m);
  assert.match(toml, /\[\[d1_databases\]\]/);
  assert.match(toml, /binding\s*=\s*"DB"/);
  assert.match(toml, /database_name\s*=\s*"cores-db"/);
  assert.match(toml, /database_id\s*=\s*"[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/);
});
