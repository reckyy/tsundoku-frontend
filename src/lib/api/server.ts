import 'server-only';
import { createApiClient } from './request';

export const { apiGet, apiPost, apiPatch, apiDelete } = createApiClient(
  process.env.RAILS_API_URL,
);
