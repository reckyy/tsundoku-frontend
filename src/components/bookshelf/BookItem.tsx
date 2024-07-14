import { Image } from '@mantine/core';
import Link from 'next/link';

type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
};

type BookProps = {
  book: Book;
};

const BookItem = ({ book }: BookProps) => {
  return (
    <Link href={`/books/${book.id}/memos`}>
      <Image
        radius="md"
        w={100}
        h={100}
        src={book.coverImageUrl}
        alt={book.title}
      />
    </Link>
  );
};

export default BookItem;
