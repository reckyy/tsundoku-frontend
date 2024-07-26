import { Image } from '@mantine/core';
import AddBookConfirmButton from '../button/AddBookConfirmButton';
import { BookItemsProps } from '@/types/index';

const Results = ({ bookItems }: BookItemsProps) => {
  return (
    <div>
      {bookItems.length > 0 ? (
        bookItems.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <h3>{book.author}</h3>
            <Image
              radius="md"
              w={100}
              h={100}
              src={book.coverImageUrl}
              alt={book.title}
            />
            <AddBookConfirmButton book={book} />
          </div>
        ))
      ) : (
        <p>検索結果がありません。</p>
      )}
    </div>
  );
};

export default Results;
