import BookItem from './BookItem';
import { Grid, GridCol, Space, Center } from '@mantine/core';
import { BookItemsProps, Book } from '@/types/index';

const BookItems = ({ bookItems }: BookItemsProps) => {
  return (
    <div>
      {bookItems.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {bookItems.map((book: Book) => (
            <GridCol span={{ base: 6, sm: 4 }} key={book.id}>
              <Center>
                <BookItem book={book} />
              </Center>
            </GridCol>
          ))}
        </Grid>
      ) : (
        <p>検索結果がありません。</p>
      )}
    </div>
  );
};

export default BookItems;
