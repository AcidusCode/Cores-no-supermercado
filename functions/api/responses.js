import {validateRecord} from '../../lib/validate.mjs';
import {json, readJson, sameOrigin} from '../_lib/http.js';

export async function onRequestPost({request, env}) {
  if (!sameOrigin(request)) return json(403, {ok: false});
  let input;
  try { input = await readJson(request); } catch { return json(400, {ok: false}); }
  if (input?.action !== 'submit') return json(400, {ok: false});
  let record;
  try { record = validateRecord(input); } catch { return json(400, {ok: false}); }
  try {
    // Participant UUID is an idempotency key: retrying never creates duplicate rows.
    await env.DB
      .prepare('INSERT INTO participations (participant,submitted_at,language,payload,profile) VALUES (?,?,?,?,?) ON CONFLICT(participant) DO NOTHING')
      .bind(record.participant, record.submittedAt, record.language, JSON.stringify(record), record.profile && JSON.stringify(record.profile))
      .run();
  } catch {
    return json(500, {ok: false});
  }
  return json(200, {ok: true});
}
