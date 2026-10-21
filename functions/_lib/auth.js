// Stateless admin authentication for Cloudflare Workers (no in-memory sessions).
// Token format: `<expiryMs>.<hex HMAC-SHA256(expiryMs, key derived from ADMIN_PASSWORD)>`.
export const COOKIE_NAME = 'cores_admin';
export const SESSION_MS = 8 * 3600 * 1000;
const MIN_PASSWORD_LENGTH = 12;
const encoder = new TextEncoder();

export const adminConfigured = env =>
  typeof env?.ADMIN_PASSWORD === 'string' && env.ADMIN_PASSWORD.length >= MIN_PASSWORD_LENGTH;

const sha256 = async text => new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(text)));
const toHex = bytes => [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');

// Constant-time comparison of two equal-or-different length byte arrays.
function safeEqual(a, b) {
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

export async function passwordMatches(input, env) {
  if (typeof input !== 'string') return false;
  return safeEqual(await sha256(input), await sha256(env.ADMIN_PASSWORD));
}

async function sign(payload, env) {
  // Derive the HMAC key from the password so no extra secret is required.
  const keyBytes = await sha256(`cores-admin-session:${env.ADMIN_PASSWORD}`);
  const key = await crypto.subtle.importKey('raw', keyBytes, {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

export async function issueToken(env, now = Date.now()) {
  const expiry = String(now + SESSION_MS);
  return `${expiry}.${toHex(await sign(expiry, env))}`;
}

export async function verifyToken(token, env, now = Date.now()) {
  if (typeof token !== 'string') return false;
  const match = /^(\d+)\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const expected = toHex(await sign(match[1], env));
  const valid = safeEqual(encoder.encode(expected), encoder.encode(match[2]));
  return valid && Number(match[1]) > now;
}

function cookieValue(request) {
  const prefix = `${COOKIE_NAME}=`;
  const part = request.headers.get('cookie')?.split(';').map(s => s.trim()).find(s => s.startsWith(prefix));
  return part?.slice(prefix.length);
}

export const isAuthorized = (request, env, now = Date.now()) => verifyToken(cookieValue(request), env, now);

const attrs = maxAge => `HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${maxAge}; Secure`;
export const sessionCookie = token => `${COOKIE_NAME}=${token}; ${attrs(SESSION_MS / 1000)}`;
export const clearCookie = () => `${COOKIE_NAME}=; ${attrs(0)}`;
