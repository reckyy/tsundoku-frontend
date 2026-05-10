'use client';

import { useState } from 'react';
import BookItem from './BookItem';
import BookFilterSegmentedControl, {
  EMPTY_MESSAGES,
} from './BookFilterSegmentedControl';
import { Grid, GridCol, Space, Center, Text } from '@mantine/core';
import { UserBook, Filter } from '@/types/index';

export type BookItemsProps = {
  bookItems: Record<Filter, UserBook[]>;
  isPublic: boolean;
};

export default function BookItems({ bookItems, isPublic }: BookItemsProps) {
  const [filter, setFilter] = useState<Filter>('unread_books');

  const filteredBooks = bookItems[filter];

  return (
    <>
      <Space h={20} />
      <BookFilterSegmentedControl value={filter} onChange={setFilter} />
      <Space h={20} />
      {filteredBooks.length > 0 ? (
        <Grid>
          <GridCol span={12}>
            <Space h={40} />
          </GridCol>
          {filteredBooks.map((userBook: UserBook) => (
            <GridCol span={{ base: 6, sm: 4 }} key={userBook.book.id}>
              <Center>
                <BookItem book={userBook.book} isPublic={isPublic} />
              </Center>
            </GridCol>
          ))}
        </Grid>
      ) : (
        <>
          <Space h={20} />
          <Text ta="center">{EMPTY_MESSAGES[filter]}</Text>
        </>
      )}
    </>
  );
}
