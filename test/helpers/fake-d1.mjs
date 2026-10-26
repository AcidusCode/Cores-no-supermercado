import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';

// In-memory fake of the D1 binding (prepare().bind().run()/all()) backed by node:sqlite.
export function createFakeD1() {
  const db = new DatabaseSync(':memory:');
  for (const file of ['0001_init.sql', '0002_profile_and_comments.sql']) db.exec(readFileSync(new URL(`../../migrations/${file}`, import.meta.url), 'utf8'));
  return {
    prepare(sql) {
      let params = [];
      const stmt = {
        bind(...values) { params = values; return stmt; },
        async run() {
          const info = db.prepare(sql).run(...params);
          return {success: true, meta: {changes: Number(info.changes)}};
        },
        async all() { return {success: true, results: db.prepare(sql).all(...params)}; },
      };
      return stmt;
    },
    raw: db,
  };
}

export const validInput = (overrides = {}) => ({
  action: 'submit',
  participant: '123e4567-e89b-12d3-a456-426614174000',
  consent: true,
  language: 'pt',
  version: '1',
  answers: ['peixe', 'hortofruticolas', 'carne', 'lacteos', 'padaria', 'congelados', 'bebidas'].map((category, i) => ({
    category, position: i + 1, noAssociation: false, colors: ['azul'], reasons: ['alimento'], other: '',
  })),
  ...overrides,
});
