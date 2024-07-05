'use client';

import { Editor } from '@/components/editor/Editor';
import useBookStore from '@/store/BookStore';
import { Image, SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Page() {
  const storedBookItems = useBookStore((state) => state.bookItems.bookItems);
  const updateMemo = useBookStore((state) => state.updateMemo)
  const dynamicParams = useParams<{ bookId: string }>();
  const bookItem = storedBookItems.find(
    (bookItem) => bookItem.book.id === Number(dynamicParams.bookId),
  );
  const [heading, setHeading] = useState('1');
  const numbers = bookItem?.headings.map((heading) => String(heading.number));

  const handleSave: (content: string) => Promise<boolean> = async (
    content: string,
  ) => {
    const heading_id = bookItem?.headings.find(
      (h) => h.number === Number(heading),
    )?.id;
    try {
      const res = await axios.patch(
        `http://localhost:3001/api/books/${dynamicParams.bookId}/memos`,
        {
          heading: {
            id: Number(heading_id),
          },
          memo: {
            body: content,
          },
        },
      );
      if (res.status === 200) {
        updateMemo(Number(dynamicParams.bookId), Number(heading), content)
        toast.success('メモを保存しました！');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Image
        radius="md"
        w={100}
        h={100}
        src={bookItem?.book.cover_image_url}
        alt={bookItem?.book.title}
      />
      <Editor memoBody={bookItem?.headings[Number(heading)-1].memo.body} handleSave={handleSave} />
      <SegmentedControl
        value={heading}
        onChange={setHeading}
        orientation="vertical"
        size="md"
        data={numbers ?? []}
      />
    </>
  );
}

