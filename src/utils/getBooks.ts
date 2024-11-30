import { axiosGet } from '@/lib/axios';
import { auth } from '@/auth';

export default async function getBooks() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const res = await axiosGet('/user_books', token);
  return res.data;
}
