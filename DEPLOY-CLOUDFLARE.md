# Deploying on Cloudflare Pages + D1

The static site in `dist/` is served by Cloudflare Pages. The API in `functions/` runs as Pages Functions and stores data in a D1 database. `server.mjs` stays available for local or VPS use.

## 1. Create the D1 database

```sh
npx wrangler d1 create cores-db
```

Copy the printed `database_id` into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_D1_ID`.

## 2. Apply the migration

```sh
npx wrangler d1 migrations apply cores-db --remote
```

For local development use `--local` instead of `--remote`.

## 3. Set the admin password

The password needs at least 12 characters. Without it, the admin endpoints answer `500`.

```sh
npx wrangler pages secret put ADMIN_PASSWORD
```

Admin sessions are stateless HMAC-signed cookies derived from this password. Changing the secret invalidates every active session.

## 4. Deploy

Direct upload:

```sh
npx wrangler pages deploy dist
```

Or connect the Git repository in the Cloudflare dashboard (Workers & Pages > Create > Pages) with:

- Build command: none
- Build output directory: `dist`

Then add the D1 binding `DB` (database `cores-db`) under Settings > Bindings, and the `ADMIN_PASSWORD` secret, for the Production environment.

## 5. Rate limiting (recommended)

The in-memory limiter of `server.mjs` cannot exist on Workers. Add a WAF rate-limiting rule instead (Security > WAF > Rate limiting rules):

- `/api/admin/login`: for example 10 requests per 15 minutes per IP, action Block.
- `/api/responses`: for example 240 requests per hour per IP, action Block.

## 6. Import old data (optional)

Export rows from the previous SQLite file and load them into D1:

```sh
sqlite3 data/respostas.db .dump | rg '^INSERT' > import.sql
npx wrangler d1 execute cores-db --remote --file import.sql
```

Check that the statements target `participations` (the dump may quote the table name) before running them.

## Local preview

```sh
npx wrangler d1 migrations apply cores-db --local
npx wrangler pages dev dist --binding ADMIN_PASSWORD='at-least-12-chars'
```

The `DB` binding is read from `wrangler.toml`; keep the same `database_id` for the migration and the preview so both use the same local database.
