import {
  Image,
  Card,
  SimpleGrid,
  Text,
  Grid,
  GridCol,
  Flex,
} from '@mantine/core';
import AddBookConfirmButton from '../button/AddBookConfirmButton';
import { BookItemsProps } from '@/types/index';

const Results = ({ bookItems }: BookItemsProps) => {
  return (
    <Grid justify="center" align="stretch">
      {bookItems.length > 0 ? (
        bookItems.map((book) => (
          <GridCol span={6} key={book.id}>
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
                <Flex
                  gap="sm"
                  justify="center"
                  align="center"
                  direction="column"
                >
                  <Text lineClamp={2}>{book.title}</Text>
                  <Text lineClamp={1}>{book.author}</Text>
                  <AddBookConfirmButton book={book} />
                </Flex>
              </SimpleGrid>
            </Card>
          </GridCol>
        ))
      ) : (
        <p>検索結果がありません。</p>
      )}
    </Grid>
  );
};

export default Results;
