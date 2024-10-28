'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import { UserBook, Log } from '@/types/index';
import {
  Container,
  Space,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Code,
} from '@mantine/core';
import { axiosInstance } from '@/lib/axios';
import { useClipboard } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function UserPageContent() {
  const { data: session } = useSession();
  const dynamicParams = useParams();
  const params = { id: dynamicParams.id as string };
  const apiUserUrl = `/users/${dynamicParams.id}`;
  const userPageUrl = `${process.env.NEXT_PUBLIC_NEXT_URL}/users/${dynamicParams.id}`;
  const [bookItems, setBookItems] = useState<UserBook[]>([]);
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);
  const [userName, setUserName] = useState<string>('');
  const clipboard = useClipboard();

  const handleCopyUrl = () => {
    clipboard.copy(userPageUrl);

    if (!clipboard.error && dynamicParams.id !== undefined) {
      toast.success('URLのコピーに成功しました');
    } else {
      toast.error('URLのコピーに失敗しました');
    }
  };

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
        setUserName(data.name);
        setBookItems(fetchedBookItems);
        setReadingLogs(data.logs);
      },
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div></div>;

  return (
    <div>
      <title>{`${userName}さんの公開ページ`}</title>
      {String(session?.user?.id) === dynamicParams.id && (
        <Container bg={'var(--mantine-color-blue-light'} h={150} mt="md">
          <Stack pt="md" align="center" justify="center">
            <Text>このページは他人から見たあなたのページです。</Text>
            <Text>このページは自分以外の人も見ることができます。</Text>
            <Group>
              <Code block color="gray.3">
                {`${process.env.NEXT_PUBLIC_NEXT_URL}/users/${dynamicParams.id}`}
              </Code>

              <Button onClick={handleCopyUrl}>コピー</Button>
            </Group>
          </Stack>
        </Container>
      )}
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
