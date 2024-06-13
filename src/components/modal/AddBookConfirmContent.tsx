import { Card, Image, Text, Button, Group } from '@mantine/core';

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type BookProps = {
  book: Book
}

const AddBookConfirmContent = ({book}: BookProps) => {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
        <Image
          src={book.imageUrl}
          w={100}
          h={100}
          alt="book"
        />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{book.title}を本棚に追加しますか？</Text>
      </Group>

      <Button color="blue" mt="md" radius="md">
        追加
      </Button>
    </Card>
  );
}

export default AddBookConfirmContent
