'use client';

import { Editor } from '@/components/editor/Editor';
import { Image, SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useSession, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';

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

type Book = {
  title: string;
  coverImageUrl: string;
};

type Heading = {
  id: number;
  number: number;
  title: string | null;
  memo: Memo;
};

type Memo = {
  id: number;
  body: string;
};

type BookWithMemo = {
  book: Book;
  headings: Heading[];
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
  const [bookWithMemos, setBookWithMemos] = useState<BookWithMemo>();
  const [heading, setHeading] = useState('1');

  const fetchable = status === 'authenticated' && session?.user?.email;

  async function fetcher(url: string, params: memoParams) {
    const res = await axios.get(url, { params });
    return {
      book:{
        title: res.data.book.title,
        coverImageUrl: res.data.book.cover_image_url,
      },
      headings: res.data.headings
    };
  }

  const { error, isLoading } = useSWR(
    fetchable ? [apiUrl, params] : null,
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        setBookWithMemos(data);
      },
    },
  );

  const handleSave: (content: string) => Promise<boolean> = async (
    content: string,
  ) => {
    const memoId = bookWithMemos?.headings[Number(heading) - 1].memo.id;
    try {
      const res = await axios.patch(apiUrl, {
        memo: {
          id: memoId,
          body: content,
        },
      });
      if (res.status === 200) {
        setBookWithMemos((bookWithMemos) => {
          if (!bookWithMemos) return bookWithMemos;

          return {
            ...bookWithMemos,
            headings: bookWithMemos.headings.map((h) =>
              h.number === Number(heading)
                ? {
                    ...h,
                    memo: {
                      ...h.memo,
                      body: content,
                    },
                  }
                : h,
            ),
          };
        });
        console.log(bookWithMemos);
        toast.success('メモの保存に成功しました！');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Image
        radius="md"
        w={100}
        h={100}
        src={bookWithMemos?.book.coverImageUrl}
        alt={bookWithMemos?.book.title}
      />
      <Editor
        memoBody={bookWithMemos?.headings[Number(heading) - 1].memo.body}
        handleSave={handleSave}
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
