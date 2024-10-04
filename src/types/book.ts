import { Heading } from './heading';

export type Book = {
  id: number;
  title: string;
  author?: string;
  coverImageUrl: string;
};

export type UserBook = {
  id: number;
  title: string;
  author?: string;
  coverImageUrl: string;
  userId?: number;
};

export type BookMenuProps = {
  bookId: number;
  token: string;
};

export type DeleteBookModalProps = {
  bookId: number;
  token: string;
  close: () => void;
};

export type BookProps = {
  book: UserBook;
};

export type BookItemsProps = {
  bookItems: UserBook[];
  token?: string;
};

export type BookResponse = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
  user_id?: number;
};

export type BookWithMemos = {
  book: {
    title: string;
    coverImageUrl: string;
  };
  headings: Heading[];
};
