-- Additive: participant profile as JSON text (NULL for rows created before this migration).
-- Per-answer comments live inside the existing payload JSON, so no column is needed for them.
ALTER TABLE participations ADD COLUMN profile TEXT;
