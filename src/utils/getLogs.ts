import { apiGet } from '@/lib/api/server';
import { auth } from '@/auth';

export default async function getLogs() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const data = await apiGet('/reading_logs', token);
  return data.logs;
}
