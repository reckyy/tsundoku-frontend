'use client';

import { Editor } from '@/components/editor/Editor';
import { Image, SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useSession, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export default function Page() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}

type memoParams = {
  email: string | undefined | null;
  book_id: number;
};

function PageContent() {
  const dynamicParams = useParams<{ bookId: string }>();
  const bookId = Number(dynamicParams.bookId);
  const apiUrl = `http://localhost:3001/api/books/${bookId}/memos`;
  const { data: session, status } = useSession();
  const params = {
    email: session?.user?.email,
    book_id: bookId,
  };
  const [bookWithMemos, setBookWithMemos] = useState(undefined);
  const [heading, setHeading] = useState('1');

  const fetchable = status === 'authenticated' && session?.user?.email;

  async function fetcher(url: string, params: memoParams) {
    const res = await axios.get(url, { params });
    return res.data;
  }

  const { data, error, isLoading } = useSWR(
    fetchable ? [apiUrl, params] : null,
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        setBookWithMemos(data);
      },
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Image
        radius="md"
        w={100}
        h={100}
        src={bookWithMemos?.book.cover_image_url}
        alt={bookWithMemos?.book.title}
      />
      <Editor
        memoBody={bookWithMemos?.headings[Number(heading) - 1].memo.body}
      />
      <SegmentedControl
        value={heading}
        onChange={setHeading}
        orientation="vertical"
        size="md"
        data={
          bookWithMemos?.headings.map((heading) => String(heading.number)) ?? []
        }
      />
    </>
  );
}
