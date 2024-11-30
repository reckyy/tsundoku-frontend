import CalendarContent from './CalendarContent';
import { axiosGet } from '@/lib/axios';
import { auth } from '@/auth';

export default async function Calendar() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const res = await axiosGet('/reading_logs', token);
  const readingLogs = res.data.logs;

  return <CalendarContent readingLogs={readingLogs} />;
}
