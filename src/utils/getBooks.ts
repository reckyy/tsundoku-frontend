import { axiosGet } from '@/lib/axios';

export default async function getBooks() {
  const res = await axiosGet('/user_books');
  return res.data;
}
