import BookItem from './BookItem';
import { Grid, GridCol, Space, Center, Text } from '@mantine/core';
import { BookItemsProps, UserBook } from '@/types/index';

const BookItems = ({ bookItems }: BookItemsProps) => {
  return (
    <div>
      {bookItems.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {bookItems.map((book: UserBook) => (
            <GridCol span={{ base: 6, sm: 4 }} key={book.id}>
              <Center>
                <BookItem book={book} />
              </Center>
            </GridCol>
          ))}
        </Grid>
      ) : (
        <Text>右上メニューの「本を追加」から読む本を追加しましょう！</Text>
      )}
    </div>
  );
};

export default BookItems;
