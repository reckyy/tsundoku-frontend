'use client';

import {
  Text,
  Image,
  ActionIcon,
  Center,
  Paper,
  Grid,
  rem,
  Modal,
  Space,
  SegmentedControl,
} from '@mantine/core';
import { useListState, useDisclosure, useSetState } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { UserBook } from '@/types/index';
import DeleteBookConfirmModal from '../modal/DeleteBookConfirmModal';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { axiosInstance, setHeader } from '@/lib/axios';

export type DndListProps = {
  bookItems: Record<Filter, UserBook[]>;
  token: string;
};

export type Filter = 'unread' | 'reading' | 'finished';

export default function DndList({ bookItems, token }: DndListProps) {
  const [source, setSource] = useState<number>(0);
  const [unreadBooks, unreadBooksHandlers] = useListState<UserBook>(
    bookItems['unread'],
  );
  const [readingBooks, readingBooksHandlers] = useListState<UserBook>(
    bookItems['reading'],
  );
  const [finishedBooks, finishedBooksHandlers] = useListState<UserBook>(
    bookItems['finished'],
  );
  const [deleteParamsState, setDeleteParamsState] = useSetState({
    userBookId: 0,
    position: 0,
    token,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [filter, setFilter] = useState<Filter>('unread');
  const filteredBooks =
    filter === 'unread'
      ? unreadBooks
      : filter === 'reading'
        ? readingBooks
        : finishedBooks;

  const emptyMessages: Record<Filter, string> = {
    unread: '「本を追加」から読む本を追加しましょう！',
    reading: '今読んでいる本はありません。',
    finished: '読み終わった本はありません。',
  };

  const handleClick = (item: UserBook) => {
    setDeleteParamsState({
      userBookId: item.id,
      position: filteredBooks.indexOf(item),
    });
    open();
  };

  const handleDragStart = (index: number) => {
    setSource(index);
  };

  const handleDragOver = (e: {
    dataTransfer: { dropEffect: string };
    preventDefault: () => void;
  }) => {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    e.preventDefault(); // ドロップを許可するために必要
  };

  const handleDragEnd = async (index: number) => {
    if (source === index) {
      return;
    }

    const userBook = filteredBooks.find((_element, idx) => idx === source);
    const destinationBook = filteredBooks.find(
      (_element, idx) => idx === index,
    );
    const params = {
      userBookId: userBook?.id,
      destinationBookId: destinationBook?.id,
    };
    await setHeader(token!);
    try {
      await axiosInstance.patch(`/user_books/${userBook?.id}/position`, params);
      const handler =
        filter === 'unread'
          ? unreadBooksHandlers
          : filter === 'reading'
            ? readingBooksHandlers
            : finishedBooksHandlers;
      handler.swap({ from: source, to: index });
      toast.success('本の並び替えに成功しました！');
    } catch (error) {
      toast.error('本の並び替えに失敗しました。');
    }
  };

  const items = filteredBooks.map((item, index) => (
    <div
      className="cursor-grab"
      draggable
      key={index}
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDragEnd(index)}
    >
      <Paper withBorder shadow="xs" radius="md" p="lg" my="md">
        <Grid>
          <Grid.Col span={2}>
            <Image
              w={rem(60)}
              src={item.book.coverImageUrl}
              alt={item.book.title}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{item.book.title}</Text>
            <Text c="dimmed" size="sm">
              {item.book.author}
            </Text>
          </Grid.Col>
          <Grid.Col offset={1} span={1}>
            <Center>
              <ActionIcon
                variant="light"
                color="red"
                aria-label="deleteBook"
                onClick={() => handleClick(item)}
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Center>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  ));

  return (
    <>
      <Modal
        opened={opened}
        radius="md"
        onClose={close}
        withCloseButton={false}
        centered
      >
        <DeleteBookConfirmModal
          userBookId={deleteParamsState.userBookId}
          token={token!}
          close={close}
        />
      </Modal>
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
      {items.length > 0 ? (
        items
      ) : (
        <>
          <Space h={20} />
          <Text ta="center">{emptyMessages[filter]}</Text>
        </>
      )}
    </>
  );
}
