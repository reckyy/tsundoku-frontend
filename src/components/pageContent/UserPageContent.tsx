'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import { UserBook, Log } from '@/types/index';
import { Container, Space, Title } from '@mantine/core';
import { axiosInstance } from '@/lib/axios';

export default function UserPageContent() {
  const dynamicParams = useParams();
  const params = { id: dynamicParams.id as string };
  const apiUserUrl = `/users/${dynamicParams.id}`;
  const [bookItems, setBookItems] = useState<UserBook[]>([]);
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);

  function fetcher(url: string, params: { id: string }) {
    return axiosInstance.get(url, { params }).then((res) => res.data);
  }

  const { error, isLoading } = useSWR(
    [apiUserUrl, params],
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        const fetchedBookItems = data.user_books.map((userBook: UserBook) => ({
          book: {
            id: userBook.book.id,
            title: userBook.book.title,
            author: userBook.book.author,
            coverImageUrl: userBook.book.coverImageUrl,
          },
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
        <Title size={'h2'} ta={'center'}>
          読書記録
        </Title>
        <Space h={20} />
        <CalendarContent readingLogs={readingLogs} />
        <Space h="20" />
        <Title size={'h2'} ta={'center'}>
          本棚
        </Title>
        <BookItems bookItems={bookItems} isPublic={true} />
        <Space h={60} />
      </Container>
    </div>
  );
}
