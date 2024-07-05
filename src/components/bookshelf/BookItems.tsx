'use client';

import BookItem from './BookItem';
import { SimpleGrid } from '@mantine/core';
import useBookStore from '@/store/BookStore';
import { useEffect } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
};

type Heading = {
  id: number;
  number: number;
  title: string | null;
  memo: Memo;
};

type Memo = {
  id: number;
  body: string;
};

type BookItem = {
  book: Book;
  headings: Heading[];
};

type BookProps = {
  bookItems: BookItem[];
};

const BookItems = ({ bookItems }: BookProps) => {
  const isInitialized = useBookStore((state) => state.isInitialized);
  const setBookItems = useBookStore((state) => state.setBookItems);

  useEffect(() => {
    if (!isInitialized) {
      setBookItems({ bookItems });
    }
  }, [isInitialized, setBookItems, bookItems]);

  const storedBookItems = useBookStore((state) => state.bookItems.bookItems);

  return (
    <div>
      {storedBookItems.length > 0 ? (
        <SimpleGrid
          cols={3}
          spacing="xl"
          verticalSpacing="xl"
          p={{ base: 'xl' }}
        >
          {storedBookItems.map((bookItem: BookItem) => (
            <div key={bookItem.book.id}>
              <BookItem book={bookItem.book} />
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <p>検索結果がありません。</p>
      )}
    </div>
  );
};

export default BookItems;
