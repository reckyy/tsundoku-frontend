'use client';

import {
  Text,
  Image,
  ActionIcon,
  Center,
  Paper,
  Grid,
  rem,
  Group,
  Button,
  Modal,
} from '@mantine/core';
import { useListState, useDisclosure, useSetState } from '@mantine/hooks';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { IconTrash, IconCheck } from '@tabler/icons-react';
import { BookItemsProps, Book } from '@/types/index';
import axios from 'axios';
import DeleteBookConfirmModal from '../modal/DeleteBookConfirmModal';

export function DndList({ bookItems, uid }: BookItemsProps) {
  const [state, stateHandlers] = useListState(bookItems);
  const [deleteParamsState, setDeleteParamsState] = useSetState({
    bookId: 0,
    position: 0,
    uid: uid,
  });
  const [disabled, { close: enableButton }] = useDisclosure(true);
  const [opened, { open, close }] = useDisclosure(false);

  const handleClick = (item: Book) => {
    setDeleteParamsState({ bookId: item.id, position: state.indexOf(item) });
    open();
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    stateHandlers.reorder({ from: source.index, to: destination?.index || 0 });
    disabled && enableButton();
  };

  const handleSave = async () => {
    const params = state.map((item, index) => ({
      bookId: item.id,
      position: index,
    }));
    try {
      const res = await axios.patch(
        'http://localhost:3001/api/user_books',
        params,
      );
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const items = state.map((item, index) => (
    <Draggable
      key={String(item.id)}
      index={index}
      draggableId={String(item.id)}
    >
      {(provided) => (
        <Paper
          withBorder
          shadow="xs"
          radius="md"
          p="lg"
          my="md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
                  aria-label="Settings"
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
      )}
    </Draggable>
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
        <DeleteBookConfirmModal params={deleteParamsState} close={close} />
      </Modal>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Group justify="flex-end">
        <Button
          variant="light"
          color="blue"
          rightSection={<IconCheck size={14} />}
          disabled={disabled}
        >
          保存
        </Button>
      </Group>
    </>
  );
}
