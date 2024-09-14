import axios from 'axios';
import CalendarContent from './CalendarContent';
import { auth } from '@/auth';

export default async function Calendar() {
  const session = await auth();
  const params = { userId: session?.user?.id };
  const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
  const res = await axios.get(`${apiUrl}/reading_logs`, {
    params,
  });
  const readingLogs = res.data;

  return <CalendarContent readingLogs={readingLogs} />;
}
