import { Book } from '@/types/index';
import { axiosInstance, setHeader } from '@/lib/axios';

export default async function getBooks(token: string) {
  await setHeader(token);
  const res = await axiosInstance.get('/books');
  return res.data.map((book: Book) => ({
    ...book,
    coverImageUrl: book.coverImageUrl,
  }));
}
