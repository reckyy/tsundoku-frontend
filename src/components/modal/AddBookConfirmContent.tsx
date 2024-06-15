import { Card, Image, Text, Button, Group } from '@mantine/core';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type BookProps = {
  book: Book;
};

const AddBookConfirmContent = ({ book }: BookProps) => {
  const { data: session } = useSession();

  const handleSubmit = async () => {
    const title = book.title;
    const author = book.author;
    const cover_image_url = book.imageUrl;
    const email = session?.user?.email;
    try {
      const res = await axios.post('http://localhost:3001/api/books', {
        title,
        author,
        cover_image_url,
        email,
      });
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Image src={book.imageUrl} w={100} h={100} alt="book" />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{book.title}を本棚に追加しますか？</Text>
      </Group>

      <Button color="blue" mt="md" radius="md" onClick={handleSubmit}>
        追加
      </Button>
    </Card>
  );
};

export default AddBookConfirmContent;
