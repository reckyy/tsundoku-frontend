import { createApiClient } from './request';

export const { apiGet, apiPost, apiPatch, apiDelete } = createApiClient(
  process.env.NEXT_PUBLIC_RAILS_API_URL,
);
