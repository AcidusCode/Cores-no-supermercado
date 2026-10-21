import {adminConfigured, clearCookie} from '../../_lib/auth.js';
import {json, sameOrigin} from '../../_lib/http.js';

export function onRequestPost({request, env}) {
  if (!sameOrigin(request)) return json(403, {ok: false});
  if (!adminConfigured(env)) return json(500, {ok: false});
  return json(200, {ok: true}, {'Set-Cookie': clearCookie()});
}
