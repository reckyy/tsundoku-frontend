import { Card, Image, Text, Button, Flex } from '@mantine/core';
import { Book } from '@/types/index';
import useAddBook from '@/hooks/useAddBook';
import { SessionProvider } from 'next-auth/react';

export default function AddBookConfirmModal({ book }: { book: Book }) {
  return (
    <SessionProvider>
      <AddBookConfirmContent book={book} />
    </SessionProvider>
  );
}

const AddBookConfirmContent = ({ book }: { book: Book }) => {
  const { handleSubmit } = useAddBook(book);

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
        <Button color="blue" radius="md" onClick={handleSubmit}>
          追加
        </Button>
      </Flex>
    </Card>
  );
};
