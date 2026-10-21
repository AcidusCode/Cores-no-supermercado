const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};
export const MAX_BODY_BYTES = 65536;

export function json(status, data, extraHeaders = {}) {
  const headers = new Headers(BASE_HEADERS);
  for (const [name, value] of Object.entries(extraHeaders)) headers.append(name, value);
  return new Response(JSON.stringify(data), {status, headers});
}

// Same rule as server.mjs: when an Origin header is sent, its host must match the request host.
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

// Reads a JSON body (any content type) limited to MAX_BODY_BYTES; throws when too large or malformed.
export async function readJson(request) {
  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > MAX_BODY_BYTES) throw new Error('Too large');
  return JSON.parse(new TextDecoder().decode(bytes));
}
