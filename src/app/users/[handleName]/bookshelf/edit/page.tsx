import axios from 'axios';
import { auth } from '#auth';
import { BookResponse } from '@/types/index';
import { Container, Title, Space } from '@mantine/core';
import { DndList } from '@/components/bookshelf/DndList';

const Page = async () => {
  const session = await auth();

  const getBooks = async () => {
    const params = { id: session?.user?.id };
    const res = await axios.get('http://localhost:3001/api/books', { params });
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
};

export default Page;
