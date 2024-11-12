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

export type Filter = 'unread' | 'reading' | 'finished';

export type BookWithMemos = UserBook & { headings: Heading[] };
