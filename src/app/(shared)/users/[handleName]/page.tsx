'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalContent from '@/components/Cal/CalContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { BookResponse, Book, Log } from '@/types/index';
import { Container, Space, Paper } from '@mantine/core';
import { UserParams } from '@/types/index';

export default function Page() {
  const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
  const dynamicParams = useParams();
  const params = { handleName: dynamicParams.handleName };
  const apiUserUrl = `${apiUrl}/users/${dynamicParams.id}`;
  const [bookItems, setBookItems] = useState<Book[]>([]);
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);

  function fetcher(url: string, params: UserParams) {
    return axios.get(url, { params }).then((res) => res.data);
  }

  const { error, isLoading } = useSWR(
    [apiUserUrl, params],
    ([url, params]) => fetcher(url, params),
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
    <Container my="md">
      <BookItems bookItems={bookItems} />
      <Space h={60} />
      <Paper withBorder shadow="xs" radius="md" p="xl">
        <Space h={20} />
        <CalContent readingLogs={readingLogs} />
      </Paper>
    </Container>
  );
}
