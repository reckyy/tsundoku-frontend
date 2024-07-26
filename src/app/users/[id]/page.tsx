'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalContent from '@/components/Cal/CalContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';

type BookResponse = {
  id: number;
  title: string;
  author: string;
  cover_image_url: string;
  created_at: string;
  updated_at: string;
};

type Book = {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string;
}

type Log = {
  date: string;
  count: number
}

type Params = {
  uid: string | string[];
};

export default function Page() {
  const dynamicParams = useParams();
  const [bookItems, setBookItems] = useState<Book[]>([]);
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);

  function fetcher(url: string, params: Params) {
    return axios.get(url, { params }).then((res) => res.data);
  }

  const { error, isLoading } = useSWR(
    [
      `http://localhost:3001/api/users/${dynamicParams.id}`,
      { uid: dynamicParams.id },
    ],
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        const bookItems = data.books.map((book: BookResponse) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          coverImageUrl: book.cover_image_url,
        }));
        setBookItems(bookItems)
        setReadingLogs(data.logs);
      },
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <BookItems bookItems={bookItems} />
      <CalContent readingLogs={readingLogs} />
    </>
  );
}
