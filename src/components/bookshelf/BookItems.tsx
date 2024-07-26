import BookItem from './BookItem';
import { SimpleGrid } from '@mantine/core';

type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
};

type BookItemsProps = {
  bookItems: Book[];
};

const BookItems = ({ bookItems }: BookItemsProps) => {
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
