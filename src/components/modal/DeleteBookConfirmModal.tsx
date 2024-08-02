import { Text, Divider, Group, Button, Space } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { DeleteBookModalProps } from '@/types/book';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteBookConfirmModal({
  params,
  close,
}: DeleteBookModalProps) {
  const router = useRouter();
  const handleDeleteBook = async () => {
    const deleteBookApiUrl = `http://localhost:3001/api/user_books/${params.bookId}`;
    try {
      const res = await axios.delete(deleteBookApiUrl, {
        params,
      });
      if (res.status === 204) {
        router.refresh();
        toast('本を削除しました。');
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

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
