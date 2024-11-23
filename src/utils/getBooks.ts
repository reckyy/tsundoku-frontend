import { axiosInstance, setHeader } from '@/lib/axios';
import { auth } from '@/auth';

export default async function getBooks() {
  const session = await auth();
  await setHeader(session?.user?.accessToken);
  const res = await axiosInstance.get('/user_books');
  return res.data;
}
