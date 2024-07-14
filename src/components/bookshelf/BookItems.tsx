import BookItem from './BookItem';
import { SimpleGrid } from '@mantine/core';
import { auth } from '@/auth';

type BookResponse = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
};

type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
};

const BookItems = async () => {
  const getBooks = async () => {
    const session = await auth();
    const res = await fetch(
      `http://localhost:3001/api/books?email=${session?.user?.email}`,
    );
    const data = await res.json();
    return data.map((book: BookResponse) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      coverImageUrl: book.cover_image_url,
    }));
  };

  const bookItems = await getBooks();

  return (
    <div>
      {bookItems.length > 0 ? (
        <SimpleGrid
          cols={3}
          spacing="xl"
          verticalSpacing="xl"
          p={{ base: 'xl' }}
        >
          {bookItems.map((book: Book) => (
            <div key={book.id}>
              <BookItem book={book} />
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <p>検索結果がありません。</p>
      )}
    </div>
  );
};

export default BookItems;
