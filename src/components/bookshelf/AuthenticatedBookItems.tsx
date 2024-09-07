import { auth } from '@/auth';
import axios from 'axios';
import BookItems from './BookItems';
import { BookResponse } from '@/types/index';

const AuthenticatedBookItems = async () => {
  const getBooks = async () => {
    const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
    const session = await auth();
    const params = { userId: session?.user?.id };
    const res = await axios.get(`${apiUrl}/books`, { params });
    return res.data.map((book: BookResponse) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      coverImageUrl: book.cover_image_url,
    }));
  };

  const bookItems = await getBooks();

  return <BookItems bookItems={bookItems} />;
};

export default AuthenticatedBookItems;
