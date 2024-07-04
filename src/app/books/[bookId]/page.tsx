'use client';

import { Editor } from '@/components/editor/Editor';
import useBookStore from '@/store/BookStore';
import { Image } from '@mantine/core';
import { useParams } from 'next/navigation';

export default function Page() {
  const storedBookItems = useBookStore((state) => state.bookItems.bookItems);
  const params = useParams<{ bookId: string }>();
  const bookItem = storedBookItems.find(
    (bookItem) => bookItem.book.id === Number(params.bookId),
  );
  return (
    <>
      <Image
        radius="md"
        w={100}
        h={100}
        src={bookItem?.book.cover_image_url}
        alt={bookItem?.book.title}
      />
      <Editor />
    </>
  );
}
