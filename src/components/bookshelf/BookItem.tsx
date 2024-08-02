'use client';

import { BackgroundImage, Image, Group } from '@mantine/core';
import { useSession, SessionProvider } from 'next-auth/react';
import { BookProps } from '@/types/index';
import BookMenu from './BookMenu';

const BookItemContent = ({ book }: BookProps) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <BackgroundImage radius="md" w={141} h={200} src={book.coverImageUrl}>
          <Group justify="flex-end">
            <BookMenu bookId={book.id} uid={session?.user?.id} />
          </Group>
        </BackgroundImage>
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
