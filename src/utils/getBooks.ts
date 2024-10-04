import { BookResponse } from '@/types/index';
import { axiosInstance, setHeader } from '@/lib/axios';

export default async function getBooks(token: string) {
  await setHeader(token);
  const res = await axiosInstance.get('/books');
  return res.data.map((book: BookResponse) => ({
    ...book,
    coverImageUrl: book.cover_image_url,
    userId: book.user_id,
  }));
}
