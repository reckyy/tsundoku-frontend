import axios from 'axios';
import CalendarContent from './CalendarContent';
import { auth } from '@/auth';
import { API_CONSTS } from '@/consts/apiConsts';

export default async function Calendar() {
  const { RAILS_API_URL } = API_CONSTS;
  const session = await auth();
  const params = { userId: session?.user?.id };
  const res = await axios.get(`${RAILS_API_URL}/reading_logs`, {
    params,
  });
  const readingLogs = res.data;

  return <CalendarContent readingLogs={readingLogs} />;
}
