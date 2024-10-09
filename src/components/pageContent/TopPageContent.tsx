import { auth } from '@/auth';
import { Container, Space, Paper, Text } from '@mantine/core';
import TopPage from '@/components/top/TopPage';
import BookItems from '@/components/bookshelf/BookItems';
import Calendar from '@/components/calendar/Calendar';
import getBooks from '@/utils/getBooks';

export default async function TopPageContent() {
  const session = await auth();
  if (session?.user) {
    const bookItems = await getBooks(session.user.accessToken);

    return (
      <Container my="md">
        <BookItems bookItems={bookItems} isPublic={false} />
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
