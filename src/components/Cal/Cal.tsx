import axios from 'axios';
import CalContent from './CalContent';
import { auth } from '@/auth';

export default async function Cal() {
  const session = await auth();
  const params = { id: session?.user?.id };
  const res = await axios.get('http://localhost:3001/api/reading_logs', {
    params,
  });
  const readingLogs = res.data;

  return <CalContent readingLogs={readingLogs} />;
}
