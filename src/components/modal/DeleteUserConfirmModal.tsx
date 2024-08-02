import { Text, Divider, Space, Button, Group } from '@mantine/core';
import { UserParams } from '@/types/index';
import axios from 'axios';
import { handleSignOut } from '@/feature/SignOut';

export default function DeleteUserConfirmModal({ uid, close }: UserParams) {
  const handleDeleteUser = async () => {
    const params = { uid: uid };
    try {
      const res = await axios.delete(`http://localhost:3001/api/users/${uid}`, {
        params,
      });
      if (res.status === 204) {
        handleSignOut();
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
