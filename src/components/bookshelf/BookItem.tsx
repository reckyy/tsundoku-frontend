'use client';

import { Image } from '@mantine/core';
import Link from 'next/link';
import { useSession, SessionProvider } from 'next-auth/react';
import { BookProps } from '@/types/index';

const BookItemContent = ({ book }: BookProps) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Link href={`/books/${book.id}/memos`}>
          <Image
            radius="md"
            w={120}
            h={130}
            src={book.coverImageUrl}
            alt={book.title}
          />
        </Link>
      ) : (
        <Image
          radius="md"
          w={100}
          h={100}
          src={book.coverImageUrl}
          alt={book.title}
        />
      )}
    </>
  );
};

const BookItem = ({ book }: BookProps) => {
  return (
    <SessionProvider>
      <BookItemContent book={book} />
    </SessionProvider>
  );
};

export default BookItem;
