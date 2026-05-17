import { apiGet } from '@/lib/api/server';
import { auth } from '@/auth';

export default async function getBooks() {
  const session = await auth();
  const token = session?.user?.accessToken;
  return await apiGet('/user_books', token);
}
