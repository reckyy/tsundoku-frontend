'use client';

import { Image } from '@mantine/core';
import { Book } from '@/types/index';
import Link from 'next/link';

export type BookItemProps = {
  book: Book;
  isPublic: boolean;
};

export default function BookItem({ book, isPublic }: BookItemProps) {
  return (
    <>
      {!isPublic ? (
        <Link href={`/books/${book.id}/memos`}>
          <Image
            radius="md"
            w={141}
            h={200}
            src={book.coverImageUrl}
            alt={book.title}
          />
        </Link>
      ) : (
        <Image
          radius="md"
          w={141}
          h={200}
          src={book.coverImageUrl}
          alt={book.title}
        />
      )}
    </>
  );
}
