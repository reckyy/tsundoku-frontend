import { Text, Divider, Space, Button, Group } from '@mantine/core';
import { UserParams } from '@/types/index';
import axios from 'axios';
import { handleSignOut } from '@/feature/SignOut';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteUserConfirmModal({ id, close }: UserParams) {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const params = { userId: id };
    const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
    try {
      const res = await axios.delete(`${apiUrl}/users/${id}`, {
        params,
      });
      if (res.status === 204) {
        handleSignOut();
        router.push('/thanks');
        router.refresh();
        toast.success('アカウントを削除しました。');
      } else {
        return false;
      }
    } catch (error) {
      toast.error('退会に失敗しました。');
    }
  };
  return (
    <>
      <Text size="lg" fw={700} ta="center">
        本当に削除しますか？
      </Text>
      <Divider my="lg" />
      <Text c="dimmed" ta="center">
        アカウントを削除すると、すべてのデータが削除されます。この操作は戻すことができません。
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
          onClick={handleDeleteUser}
        >
          削除
        </Button>
      </Group>
    </>
  );
}
