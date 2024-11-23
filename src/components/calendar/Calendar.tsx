import CalendarContent from './CalendarContent';
import { auth } from '@/auth';
import { axiosInstance, setHeader } from '@/lib/axios';

export default async function Calendar() {
  const session = await auth();
  await setHeader(session?.user?.accessToken);
  const res = await axiosInstance.get('/reading_logs', {});
  const readingLogs = res.data.logs;

  return <CalendarContent readingLogs={readingLogs} />;
}
