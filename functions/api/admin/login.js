import {adminConfigured, issueToken, passwordMatches, sessionCookie} from '../../_lib/auth.js';
import {json, readJson, sameOrigin} from '../../_lib/http.js';

export async function onRequestPost({request, env}) {
  if (!sameOrigin(request)) return json(403, {ok: false});
  if (!adminConfigured(env)) return json(500, {ok: false});
  let input;
  try { input = await readJson(request); } catch { return json(400, {ok: false}); }
  if (!(await passwordMatches(input?.password, env))) return json(401, {ok: false});
  return json(200, {ok: true}, {'Set-Cookie': sessionCookie(await issueToken(env))});
}
