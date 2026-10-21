import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('DEPLOY-CLOUDFLARE.md documents the required deployment steps', async () => {
  const doc = await readFile(new URL('../DEPLOY-CLOUDFLARE.md', import.meta.url), 'utf8');
  for (const needle of [
    'wrangler d1 create cores-db',
    'REPLACE_WITH_YOUR_D1_ID',
    'wrangler d1 migrations apply cores-db --remote',
    'wrangler pages secret put ADMIN_PASSWORD',
    'wrangler pages deploy',
    '`dist`',
    '/api/admin/login',
    '/api/responses',
    'sqlite3 data/respostas.db .dump',
  ]) assert.ok(doc.includes(needle), `missing: ${needle}`);
});
