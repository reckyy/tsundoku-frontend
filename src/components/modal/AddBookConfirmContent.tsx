import { Card, Image, Text, Button, Group, NumberInput } from '@mantine/core';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRef } from 'react';

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
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const title = book.title;
    const author = book.author;
    const coverImageUrl = book.imageUrl;
    const uid = session?.user?.id;
    const headingNumber = ref.current?.value;
    try {
      const res = await axios.post('http://localhost:3001/api/books', {
        title,
        author,
        coverImageUrl,
        uid,
        headingNumber,
      });
      if (res.status === 200) {
        router.push('/');
        router.refresh();
        toast.success('本を保存しました！');
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Image src={book.imageUrl} w={100} h={100} alt="book" />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{book.title}を本棚に追加しますか？</Text>
        <NumberInput label="章の数" defaultValue={1} min={1} ref={ref} />
      </Group>

      <Button color="blue" mt="md" radius="md" onClick={handleSubmit}>
        追加
      </Button>
    </Card>
  );
};

export default AddBookConfirmContent;
