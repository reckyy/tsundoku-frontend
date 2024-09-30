'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { BookResponse, Book, Log } from '@/types/index';
import { Container, Space, Paper } from '@mantine/core';
import { UserParams } from '@/types/index';
import { API_CONSTS } from '@/consts/apiConsts';

export default function UserPageContent() {
  const { RAILS_API_URL } = API_CONSTS;
  const dynamicParams = useParams();
  const params = { id: dynamicParams.id };
  const apiUserUrl = `${RAILS_API_URL}/users/${dynamicParams.id}`;
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
          coverImageUrl: book.cover_image_url,
        }));
        setBookItems(fetchedBookItems);
        setReadingLogs(data.logs);
      },
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div></div>;

  return (
    <div>
      <title>公開ページ</title>
      <Container my="md">
        <BookItems bookItems={bookItems} />
        <Space h={60} />
        <Paper withBorder shadow="xs" radius="md" p="xl">
          <Space h={20} />
          <CalendarContent readingLogs={readingLogs} />
        </Paper>
      </Container>
    </div>
  );
}
