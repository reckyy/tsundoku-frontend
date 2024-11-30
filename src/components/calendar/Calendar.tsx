import CalendarContent from './CalendarContent';
import { axiosGet } from '@/lib/axios';

export default async function Calendar() {
  const res = await axiosGet('/reading_logs');
  const readingLogs = res.data.logs;

  return <CalendarContent readingLogs={readingLogs} />;
}
