import { Heading } from './heading';

export type Book = {
  id: number;
  title: string;
  author?: string;
  coverImageUrl: string;
};

export type UserBook = {
  id: number;
  book: Book;
};

export type BookWithMemos = UserBook & { headings: Heading[] };
