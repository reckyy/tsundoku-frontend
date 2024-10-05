import { Heading } from './heading';

export type Book = {
  id: number;
  title: string;
  author?: string;
  coverImageUrl: string;
};

export type BookWithMemos = {
  book: {
    title: string;
    coverImageUrl: string;
  };
  headings: Heading[];
};
