import { auth } from '@/auth';
import { Container, Title, Space, Text } from '@mantine/core';
import DndList from '@/components/bookshelf/DndList';
import getBooks from '@/utils/getBooks';

export default async function BookShelfPageContent() {
  const session = await auth();
  const bookItems = await getBooks();

  return (
    <Container my="md">
      <Title order={2} ta="center">
        {session?.user?.name}さんの本棚
      </Title>
      <Text c="dimmed" ta="center" pt="md">
        ドラッグ&ドロップで本の順番を入れ替えたり、削除したりできます。
      </Text>
      <Space h={20} />
      <DndList bookItems={bookItems} />
    </Container>
  );
}
