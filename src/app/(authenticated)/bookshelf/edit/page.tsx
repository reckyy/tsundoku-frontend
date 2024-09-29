import { auth } from '@/auth';
import { Container, Title, Space } from '@mantine/core';
import DndList from '@/components/bookshelf/DndList';
import getBooks from '@/utils/getBooks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '本棚編集',
};

export default async function Page() {
  const session = await auth();
  const bookItems = await getBooks(session?.user?.id);

  return (
    <Container my="md">
      <Title order={3} ta="center">
        {session?.user?.name}さんの本棚
      </Title>
      <Space h={30} />
      <DndList bookItems={bookItems} userId={session?.user?.id} />
    </Container>
  );
}
