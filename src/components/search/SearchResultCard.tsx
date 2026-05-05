import { Image, Card, SimpleGrid, Text, Flex } from '@mantine/core';
import AddBookButton from '../button/AddBookButton';
import { Book } from '@/types/index';

export default function SearchResultCard({ book }: { book: Book }) {
  return (
    <Card padding="md" withBorder shadow="sm" radius="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Image
          radius="lg"
          w={141}
          h={200}
          fit="contain"
          src={book.coverImageUrl}
          alt={book.title}
        />
        <Flex gap="sm" justify="center" align="center" direction="column">
          <Text lineClamp={2}>{book.title}</Text>
          <Text lineClamp={1}>{book.author}</Text>
          <AddBookButton book={book} />
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
