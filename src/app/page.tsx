import { auth } from '#auth';
import { Container, Space, Paper, Text } from '@mantine/core';
import TopPage from '@/components/top/TopPage';
import Welcome from '@/components/top/Welcome';
import axios from 'axios';
import BookItems from '@/components/bookshelf/BookItems';
import Cal from '@/components/cal/Cal';
import { BookResponse } from '@/types/index';

export default async function Home() {
  const session = await auth();
  if (session?.user.handleName.includes('User')) {
    return <Welcome />;
  } else if (session?.user) {
    const getBooks = async () => {
      const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
      const session = await auth();
      const params = { userId: session?.user?.id };
      const res = await axios.get(`${apiUrl}/books`, { params });
      return res.data.map((book: BookResponse) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        coverImageUrl: book.cover_image_url,
      }));
    };

    const bookItems = await getBooks();

    return (
      <Container my="md">
        <BookItems bookItems={bookItems} />
        <Space h={60} />
        <Paper withBorder shadow="xs" radius="md" p="xl">
          <Text ta={'center'}>毎日、コツコツと。</Text>
          <Space h={20} />
          <Cal />
        </Paper>
      </Container>
    );
  } else {
    return <TopPage />;
  }
}
