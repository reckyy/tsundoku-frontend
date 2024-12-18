import { Heading } from './heading';

export type Book = {
  id: number;
  title: string;
  author?: string;
  coverImageUrl: string;
};

export type UserBook = {
  id: number;
  status: string;
  book: Book;
};

export type Filter = 'unread_books' | 'reading_books' | 'finished_books';

export type BookWithMemos = UserBook & { headings: Heading[] };
