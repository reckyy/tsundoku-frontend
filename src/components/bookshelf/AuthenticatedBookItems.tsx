import { auth } from '@/auth';
import axios from 'axios';
import BookItems from './BookItems';

type BookResponse = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
};

const AuthenticatedBookItems = async () => {
  const getBooks = async () => {
    const session = await auth();
    const params = { uid: session?.user?.id };
    const res = await axios.get('http://localhost:3001/api/books', { params });
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
