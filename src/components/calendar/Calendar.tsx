import CalendarContent from './CalendarContent';
import { auth } from '@/auth';
import axiosInstance from '@/lib/axios';

export default async function Calendar() {
  const session = await auth();
  const params = { userId: session?.user?.id };
  const res = await axiosInstance.get('/reading_logs', {
    params,
  });
  const readingLogs = res.data;

  return <CalendarContent readingLogs={readingLogs} />;
}
