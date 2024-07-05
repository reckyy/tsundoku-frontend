'use client';

import { Editor } from '@/components/editor/Editor';
import useBookStore from '@/store/BookStore';
import { Image, SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const storedBookItems = useBookStore((state) => state.bookItems.bookItems);
  const dynamicParams = useParams<{ bookId: string }>();
  const bookItem = storedBookItems.find(
    (bookItem) => bookItem.book.id === Number(dynamicParams.bookId),
  );
  const [heading, setHeading] = useState('1');
  const numbers = bookItem?.headings.map((heading) => String(heading.number));

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
      <SegmentedControl value={heading} onChange={setHeading} orientation="vertical" size="md" data={numbers ?? []} />
    </>
  );
}
