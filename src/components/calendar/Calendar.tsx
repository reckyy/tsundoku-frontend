import CalendarContent from './CalendarContent';
import { auth } from '@/auth';
import { axiosInstance, setHeader } from '@/lib/axios';

export default async function Calendar() {
  const session = await auth();
  const token = session?.user?.accessToken;
  await setHeader(token!);
  const res = await axiosInstance.get('/reading_logs', {});
  const readingLogs = res.data;

  return <CalendarContent readingLogs={readingLogs} />;
}
