import { BookResponse } from '@/types/index';
import axiosInstance from '@/lib/axios';

export default async function getBooks(userId: string | undefined) {
  const params = { userId };
  const res = await axiosInstance.get('/books', { params });
  return res.data.map((book: BookResponse) => ({
    ...book,
    coverImageUrl: book.cover_image_url,
    userId: book.user_id,
  }));
}
