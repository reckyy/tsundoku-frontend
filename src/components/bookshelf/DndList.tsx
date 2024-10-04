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
} from '@mantine/core';
import { useListState, useDisclosure, useSetState } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { BookItemsProps, UserBook } from '@/types/index';
import DeleteBookConfirmModal from '../modal/DeleteBookConfirmModal';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { axiosInstance, setHeader } from '@/lib/axios';

export default function DndList({ bookItems, token }: BookItemsProps) {
  const [source, setSource] = useState<number>(0);
  const [state, stateHandlers] = useListState(bookItems);
  const [deleteParamsState, setDeleteParamsState] = useSetState({
    bookId: 0,
    position: 0,
    token,
  });
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = (item: UserBook) => {
    setDeleteParamsState({ bookId: item.id, position: state.indexOf(item) });
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

    const book = state.find((_element, idx) => idx === source);
    const destinationBook = state.find((_element, idx) => idx === index);
    const params = {
      bookId: book?.id,
      destinationBookId: destinationBook?.id,
    };
    await setHeader(token!);
    try {
      await axiosInstance.post('/user_books/move_position', params);
      stateHandlers.swap({ from: source, to: index });
      toast.success('本の並び替えに成功しました！');
    } catch (error) {
      toast.error('本の並び替えに失敗しました。');
    }
  };

  const items = state.map((item, index) => (
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
            <Image w={rem(60)} src={item.coverImageUrl} alt={item.title} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Text>{item.title}</Text>
            <Text c="dimmed" size="sm">
              {item.author}
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
          bookId={deleteParamsState.bookId}
          token={token!}
          close={close}
        />
      </Modal>
      {items}
    </>
  );
}
