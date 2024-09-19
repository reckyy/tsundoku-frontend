import axios from 'axios';
import { auth } from '@/auth';
import { BookResponse } from '@/types/index';
import { Container, Title, Space } from '@mantine/core';
import DndList from '@/components/bookshelf/DndList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '本棚編集',
};

export default async function Page() {
  const session = await auth();

  const getBooks = async () => {
    const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
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
      <Title order={3} ta="center">
        {session?.user?.name}さんの本棚
      </Title>
      <Space h={30} />
      <DndList bookItems={bookItems} id={session?.user?.id} />
    </Container>
  );
}
