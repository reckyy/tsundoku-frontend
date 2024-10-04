import { auth } from '@/auth';
import { Container, Title, Space } from '@mantine/core';
import DndList from '@/components/bookshelf/DndList';
import getBooks from '@/utils/getBooks';

export default async function BookShelfPageContent() {
  const session = await auth();
  const token = session?.user?.accessToken;
  const bookItems = await getBooks(token!);

  return (
    <Container my="md">
      <Title order={3} ta="center">
        {session?.user?.name}さんの本棚
      </Title>
      <Space h={30} />
      <DndList bookItems={bookItems} token={token} />
    </Container>
  );
}
