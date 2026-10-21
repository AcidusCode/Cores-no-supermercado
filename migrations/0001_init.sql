CREATE TABLE IF NOT EXISTS participations (
  participant TEXT PRIMARY KEY,
  submitted_at TEXT NOT NULL,
  language TEXT NOT NULL,
  payload TEXT NOT NULL
);
