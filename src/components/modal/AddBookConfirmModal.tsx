import { Card, Image, Text, Button, Flex, NumberInput } from '@mantine/core';
import { BookProps } from '@/types/index';
import useAddBook from '@/hooks/useAddBook';
import { SessionProvider } from 'next-auth/react';

export default function AddBookConfirmModal({ book }: BookProps) {
  return (
    <SessionProvider>
      <AddBookConfirmContent book={book} />
    </SessionProvider>
  );
}

const AddBookConfirmContent = ({ book }: BookProps) => {
  const { value, setValue, handleSubmit } = useAddBook(book);

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
