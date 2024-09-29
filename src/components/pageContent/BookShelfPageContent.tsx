import { auth } from '@/auth';
import { Container, Title, Space } from '@mantine/core';
import DndList from '@/components/bookshelf/DndList';
import getBooks from '@/utils/getBooks';

export default async function BookShelfPageContent() {
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
