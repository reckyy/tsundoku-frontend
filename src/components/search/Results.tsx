import {
  Image,
  Card,
  SimpleGrid,
  Text,
  Grid,
  GridCol,
  Flex,
  Center,
} from '@mantine/core';
import AddBookConfirmButton from '../button/AddBookConfirmButton';
import { Book } from '@/types/index';

const Results = ({ bookItems }: { bookItems: Book[] }) => {
  return (
    <>
      {bookItems.length > 1 ? (
        <Grid justify="center" align="stretch">
          {bookItems.map((book) => (
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
          ))}
        </Grid>
      ) : (
        <Center>
          <Card padding="md" withBorder shadow="sm" radius="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Image
                radius="lg"
                w={141}
                h={200}
                fit="contain"
                src={bookItems[0].coverImageUrl}
                alt={bookItems[0].title}
              />
              <Flex gap="sm" justify="center" align="center" direction="column">
                <Text lineClamp={2}>{bookItems[0].title}</Text>
                <Text lineClamp={1}>{bookItems[0].author}</Text>
                <AddBookConfirmButton book={bookItems[0]} />
              </Flex>
            </SimpleGrid>
          </Card>
        </Center>
      )}
    </>
  );
};

export default Results;
