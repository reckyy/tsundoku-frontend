'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalContent from '@/components/Cal/CalContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { BookResponse, Book, Log } from '@/types/index';

export default function Page() {
  const dynamicParams = useParams();
  const [bookItems, setBookItems] = useState<Book[]>([]);
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);

  function fetcher(url: string) {
    return axios.get(url).then((res) => res.data);
  }

  const { error, isLoading } = useSWR(
    `http://localhost:3001/api/users/${dynamicParams.id}`,
    fetcher,
    {
      onSuccess: (data) => {
        const fetchedBookItems = data.books.map((book: BookResponse) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          coverImageUrl: book.cover_image_url,
        }));
        setBookItems(fetchedBookItems);
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
