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
  userId: string | undefined;
};

export type DeleteBookModalProps = {
  params: BookMenuProps;
  close: () => void;
};

export type BookProps = {
  book: UserBook;
};

export type BookItemsProps = {
  bookItems: UserBook[];
  userId?: string;
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
