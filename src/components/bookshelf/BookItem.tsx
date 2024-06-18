import { Image } from '@mantine/core';

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

type BookProps = {
  book: Book
}

const BookItem = ({ book } : BookProps) => {
  return(
    <Image
      radius="md"
      w={100}
      h={100}
      src={book.cover_image_url}
      alt={book.title}
    />
  )
}

export default BookItem
