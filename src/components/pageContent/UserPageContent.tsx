'use client';

import BookItems from '@/components/bookshelf/BookItems';
import CalendarContent from '@/components/calendar/CalendarContent';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import { UserBook, Log, Filter } from '@/types/index';
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
import Head from 'next/head';

export default function UserPageContent() {
  const { data: session } = useSession();
  const dynamicParams = useParams();
  const params = { id: dynamicParams.id as string };
  const apiUserUrl = `/users/${dynamicParams.id}`;
  const userPageUrl = `${process.env.NEXT_PUBLIC_NEXT_URL}/users/${dynamicParams.id}`;
  const [bookItems, setBookItems] = useState<Record<Filter, UserBook[]>>();
  const [readingLogs, setReadingLogs] = useState<Log[]>([]);
  const [userName, setUserName] = useState<string>('');
  const clipboard = useClipboard();
  const description = `${userName}の読書記録ページです！`;
  const imageUrl = 'https://tsundoku.tech/images/tsundoku.png';

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
        setUserName(data.name);
        setBookItems(data.user_books);
        setReadingLogs(data.logs);
      },
    },
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div></div>;

  return (
    <>
      <Head>
        <title>{`${userName}のページ | Tsundoku`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${userName}のページ | Tsundoku`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta
          property="og:url"
          content={`https://tsundoku.tech/users/${userName}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${userName}のページ | Tsundoku`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

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
          <Text inherit>読書記録</Text>
        </Title>
        <Space h={20} />
        <CalendarContent readingLogs={readingLogs} />
        <Space h="20" />
        <Title size={'h2'} ta={'center'}>
          <Text inherit>本棚</Text>
        </Title>
        <BookItems bookItems={bookItems!} isPublic={true} />
        <Space h={60} />
      </Container>
    </>
  );
}
