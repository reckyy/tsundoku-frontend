import BookItem from './BookItem';
import { SimpleGrid } from '@mantine/core';
import { auth } from '@/auth';

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

const BookItems = async () => {
  const session = await auth();
  const res = await fetch(
    `http://localhost:3001/api/books?email=${session?.user?.email}`,
  );
  const bookItems = await res.json();

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
