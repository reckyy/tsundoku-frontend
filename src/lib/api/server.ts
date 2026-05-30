import 'server-only';

const BASE_URL = process.env.RAILS_API_URL;

async function request(
  method: string,
  path: string,
  token: string | undefined,
  body?: unknown,
) {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const apiGet = (path: string, token: string | undefined) =>
  request('GET', path, token);
export const apiPost = (
  path: string,
  token: string | undefined,
  body: unknown,
) => request('POST', path, token, body);
export const apiPatch = (
  path: string,
  token: string | undefined,
  body: unknown,
) => request('PATCH', path, token, body);
export const apiDelete = (path: string, token: string | undefined) =>
  request('DELETE', path, token);
