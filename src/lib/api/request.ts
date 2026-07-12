import { ApiError } from './error';

export function createApiClient(baseUrl: string | undefined) {
  async function request(
    method: string,
    path: string,
    token: string | undefined,
    body?: unknown,
  ) {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body !== undefined) headers['Content-Type'] = 'application/json';

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new ApiError(res.status, errorBody);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  return {
    apiGet: (path: string, token: string | undefined) =>
      request('GET', path, token),
    apiPost: (path: string, token: string | undefined, body: unknown) =>
      request('POST', path, token, body),
    apiPatch: (path: string, token: string | undefined, body: unknown) =>
      request('PATCH', path, token, body),
    apiDelete: (path: string, token: string | undefined) =>
      request('DELETE', path, token),
  };
}
