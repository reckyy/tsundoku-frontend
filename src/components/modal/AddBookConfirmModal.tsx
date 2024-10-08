import { Card, Image, Text, Button, Flex, NumberInput } from '@mantine/core';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { BookProps } from '@/types/index';
import { SessionProvider } from 'next-auth/react';

export default function AddBookConfirmModal({ book }: BookProps) {
  return (
    <SessionProvider>
      <AddBookConfirmContent book={book} />
    </SessionProvider>
  );
}

const AddBookConfirmContent = ({ book }: BookProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [value, setValue] = useState<string | number>('');

  const handleSubmit = async () => {
    if (value === '') {
      toast.error('章の数を入力してください。');
      return;
    }
    const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';

    try {
      await axios.post(`${apiUrl}/books`, {
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
        userId: session?.user?.id,
        headingNumber: value,
      });
      router.push('/');
      router.refresh();
      toast.success('本を保存しました！');
    } catch (error) {
      toast.error('本の保存に失敗しました。');
    }
  };

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Image src={book.coverImageUrl} w={141} h={200} alt="book" />

        <Text fw={500}>{book.title}を本棚に追加しますか？</Text>
        <NumberInput
          withAsterisk
          label="章の数"
          aria-label="headingNumber"
          min={1}
          value={value}
          onChange={setValue}
          placeholder="数字を入力してください。"
        />

        <Button color="blue" mt="md" radius="md" onClick={handleSubmit}>
          追加
        </Button>
      </Flex>
    </Card>
  );
};
