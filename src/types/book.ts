import { Heading } from './heading';

export type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
};

export type BookMenuProps = {
  bookId: number;
  uid: string | undefined;
};

export type DeleteBookModalProps = {
  params: BookMenuProps;
  close: () => void;
};

export type BookProps = {
  book: Book;
};

export type BookItemsProps = {
  bookItems: Book[];
};

export type BookResponse = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
};

export type BookWithMemo = {
  book: {
    title: string;
    coverImageUrl: string;
  };
  headings: Heading[];
};
