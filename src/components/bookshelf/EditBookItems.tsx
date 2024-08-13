'use client';

import { Book, BookItemsProps } from '@/types/index';
import {
  Space,
  Grid,
  GridCol,
  Center,
  Text,
  Image,
  Button,
  Flex,
} from '@mantine/core';
import { IconTrash, IconRefresh } from '@tabler/icons-react';

const EditBookItems = ({ bookItems }: BookItemsProps) => {
  return (
    <>
      <Space h={30} />
      {bookItems.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {bookItems.map((book: Book) => (
            <GridCol span={{ base: 6, sm: 4 }} key={book.id}>
              <Center>
                <Image
                  radius="md"
                  w={141}
                  h={200}
                  src={book.coverImageUrl}
                  alt={book.title}
                />
              </Center>
            </GridCol>
          ))}
          <Space h={30} />
          <GridCol>
            <Flex
              mih={50}
              gap="md"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Button
                variant="light"
                color="green"
                leftSection={<IconRefresh size={14} />}
              >
                変更
              </Button>
              <Button
                variant="light"
                color="red"
                disabled
                leftSection={<IconTrash size={14} />}
              >
                削除
              </Button>
            </Flex>
          </GridCol>
        </Grid>
      ) : (
        <Text>本棚に本がありません。</Text>
      )}
    </>
  );
};

export default EditBookItems;
