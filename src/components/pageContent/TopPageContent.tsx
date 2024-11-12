import { auth } from '@/auth';
import { Container, Space, Title, Button, Group, Text } from '@mantine/core';
import TopPage from '@/components/top/TopPage';
import BookItems from '@/components/bookshelf/BookItems';
import Calendar from '@/components/calendar/Calendar';
import getBooks from '@/utils/getBooks';
import { IconPlus, IconBook } from '@tabler/icons-react';
import Link from 'next/link';

export default async function TopPageContent() {
  const session = await auth();
  if (session?.user) {
    const bookItems = await getBooks();

    return (
      <Container my="md">
        <Title size={'h2'} ta={'center'}>
          <Text inherit>読書記録</Text>
        </Title>
        <Space h={20} />
        <Calendar />
        <Space h={20} />
        <Title size={'h2'} ta={'center'}>
          <Text inherit>本棚</Text>
        </Title>
        <BookItems bookItems={bookItems} isPublic={false} />
        <Space h={60} />
        <Group justify="center">
          <Link href="/search_books">
            <Button rightSection={<IconPlus size={14} />} variant="light">
              本の追加
            </Button>
          </Link>
          <Link href="/bookshelf/edit">
            <Button rightSection={<IconBook size={14} />} variant="light">
              本棚の編集
            </Button>
          </Link>
        </Group>
      </Container>
    );
  } else {
    return <TopPage />;
  }
}
