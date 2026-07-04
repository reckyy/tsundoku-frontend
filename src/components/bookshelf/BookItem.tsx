'use client';

import { Image, Center, Text, Stack } from '@mantine/core';
import { Book } from '@/types/index';
import Link from 'next/link';

export type BookItemProps = {
  book: Book;
  isPublic: boolean;
};

export default function BookItem({ book, isPublic }: BookItemProps) {
  const bookCard = (
    <>
      <Center>
        <Image
          radius="md"
          w={141}
          h={200}
          src={book.coverImageUrl}
          alt={book.title}
        />
      </Center>
      <Text size="sm" fw="700" mt="2" ta="center">
        {book.title}
      </Text>
      {book.author && (
        <Text size="sm" mt="2" ta="center">
          著者 : {book.author}
        </Text>
      )}
    </>
  );

  return !isPublic ? (
    <Link href={`/books/${book.id}/memos`}>{bookCard}</Link>
  ) : (
    <Stack>{bookCard}</Stack>
  );
}
