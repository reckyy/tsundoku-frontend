'use client';

import { useState } from 'react';
import BookItem from './BookItem';
import {
  Grid,
  GridCol,
  Space,
  Center,
  Text,
  SegmentedControl,
} from '@mantine/core';
import { UserBook } from '@/types/index';

export type BookItemsProps = {
  bookItems: Record<Filter, UserBook[]>;
  isPublic: boolean;
};

export type Filter = 'unread' | 'reading' | 'finished';

const BookItems = ({ bookItems, isPublic }: BookItemsProps) => {
  const [filter, setFilter] = useState<Filter>('unread');
  const emptyMessages: Record<Filter, string> = {
    unread: '「本を追加」から読む本を追加しましょう！',
    reading: '今読んでいる本はありません。',
    finished: '読み終わった本はありません。',
  };

  const filteredBooks = bookItems[filter];

  return (
    <>
      <Space h={20} />
      <Center>
        <SegmentedControl
          value={filter}
          onChange={(value) => setFilter(value as Filter)}
          size="md"
          data={[
            { label: 'まだ読んでない', value: 'unread' },
            { label: '読んでる途中', value: 'reading' },
            { label: '全部読んだ', value: 'finished' },
          ]}
        />
      </Center>
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
          <Text ta="center">{emptyMessages[filter]}</Text>
        </>
      )}
    </>
  );
};

export default BookItems;
