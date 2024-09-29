import { auth } from '@/auth';
import { Container, Space, Paper, Text } from '@mantine/core';
import TopPage from '@/components/top/TopPage';
import BookItems from '@/components/bookshelf/BookItems';
import Calendar from '@/components/calendar/Calendar';
import type { Metadata } from 'next';
import TopLoading from '@/components/loading/TopLoading';
import getBooks from '@/utils/getBooks';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tsundoku',
  description:
    'Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！',
};

export default function Home() {
  return (
    <Suspense fallback={<TopLoading />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const session = await auth();
  if (session?.user) {
    const bookItems = await getBooks(session.user.id);

    return (
      <Container my="md">
        <BookItems bookItems={bookItems} />
        <Space h={60} />
        <Paper withBorder shadow="xs" radius="md" p="xl">
          <Text ta={'center'}>毎日、コツコツと。</Text>
          <Space h={20} />
          <Calendar />
        </Paper>
      </Container>
    );
  } else {
    return <TopPage />;
  }
}
