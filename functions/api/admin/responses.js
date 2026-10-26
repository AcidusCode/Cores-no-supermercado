import {adminConfigured, isAuthorized} from '../../_lib/auth.js';
import {withDefaults} from '../../../lib/validate.mjs';
import {json} from '../../_lib/http.js';

export async function onRequestGet({request, env}) {
  if (!adminConfigured(env)) return json(500, {ok: false});
  if (!(await isAuthorized(request, env))) return json(401, {ok: false});
  try {
    const {results} = await env.DB.prepare('SELECT payload FROM participations ORDER BY submitted_at DESC').all();
    return json(200, {records: results.map(row => withDefaults(JSON.parse(row.payload)))});
  } catch {
    return json(500, {ok: false});
  }
}
