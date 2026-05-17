const BASE_URL = process.env.NEXT_PUBLIC_RAILS_API_URL;

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
  return res.status === 204 ? null : await res.json();
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
