'use client';

import { Image, Center, Text, Stack } from '@mantine/core';
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
        </Link>
      ) : (
        <Stack>
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
        </Stack>
      )}
    </>
  );
}
