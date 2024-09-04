'use client';

import { Image } from '@mantine/core';
import { useSession, SessionProvider } from 'next-auth/react';
import { BookProps } from '@/types/index';
import Link from 'next/link';

const BookItemContent = ({ book }: BookProps) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
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
};

const BookItem = ({ book }: BookProps) => {
  return (
    <SessionProvider>
      <BookItemContent book={book} />
    </SessionProvider>
  );
};

export default BookItem;
