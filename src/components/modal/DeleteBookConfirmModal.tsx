import { Text, Divider, Group, Button, Space } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import useDeleteBook from '@/hooks/useDeleteBook';

type DeleteBookModalProps = {
  userBookId: number;
  close: () => void;
};

export default function DeleteBookConfirmModal({
  userBookId,
  close,
}: DeleteBookModalProps) {
  const { handleDeleteBook } = useDeleteBook(userBookId);

  return (
    <>
      <Text size="lg" fw={700} ta="center">
        削除しますか？
      </Text>
      <Divider my="lg" />
      <Text c="dimmed" ta="center">
        この本を削除すると、メモとログも同時に削除されます。この操作は戻すことができません。
      </Text>
      <Space h={30} />
      <Group justify="center" gap="xl">
        <Button variant="light" radius="lg" color="gray" onClick={close}>
          キャンセル
        </Button>
        <Button
          variant="light"
          radius="lg"
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={handleDeleteBook}
        >
          削除
        </Button>
      </Group>
    </>
  );
}
