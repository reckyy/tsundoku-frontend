import BookItem from './BookItem';
import { Grid, GridCol, Space, Text } from '@mantine/core';
import { UserBook } from '@/types/index';

export type BookItemsProps = {
  bookItems: UserBook[];
  isPublic: boolean;
};

const BookItems = ({ bookItems, isPublic }: BookItemsProps) => {
  return (
    <div>
      {bookItems.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {bookItems.map((userBook: UserBook) => (
            <GridCol span={{ base: 6, sm: 4 }} key={userBook.book.id}>
              <BookItem book={userBook.book} isPublic={isPublic} />
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
