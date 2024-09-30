import axios from 'axios';
import { BookResponse } from '@/types/index';
import { API_CONSTS } from '@/consts/apiConsts';

export default async function getBooks(userId: string | undefined) {
  const { RAILS_API_URL } = API_CONSTS;
  const params = { userId };
  const res = await axios.get(`${RAILS_API_URL}/books`, { params });
  return res.data.map((book: BookResponse) => ({
    ...book,
    coverImageUrl: book.cover_image_url,
    userId: book.user_id,
  }));
}
