import axios from 'axios';
import { BookResponse } from '@/types/index';

export default async function getBooks(userId: string | undefined) {
  const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
  const params = { userId };
  const res = await axios.get(`${apiUrl}/books`, { params });
  return res.data.map((book: BookResponse) => ({
    ...book,
    coverImageUrl: book.cover_image_url,
    userId: book.user_id,
  }));
}
