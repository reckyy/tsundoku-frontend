import { axiosGet } from '@/lib/axios';
import { auth } from '@/auth';

export default async function getLogs() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const res = await axiosGet('/reading_logs', token);
  return res.data.logs;
}
