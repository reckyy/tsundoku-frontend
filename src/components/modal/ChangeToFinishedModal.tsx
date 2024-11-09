import { Text, Button, Stack } from '@mantine/core';
import useUpdateBookStatus from '@/hooks/useUpdateBookStatus';
import { IconCheck } from '@tabler/icons-react';
import { BookWithMemos } from '@/types/book';

type ChangeToFinishedModalProps = {
  userBookId: number;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setBookWithMemos: React.Dispatch<
    React.SetStateAction<BookWithMemos | undefined>
  >;
};

export default function ChangeToFinishedModal({
  userBookId,
  setModalOpened,
  setBookWithMemos,
}: ChangeToFinishedModalProps) {
  const { handleSubmit } = useUpdateBookStatus({
    userBookId,
    status: 'finished',
    setBookWithMemos,
  });

  return (
    <Stack align="center" justify="center">
      <Text size="lg" fw={700} ta="center">
        読み切りましたか？
      </Text>
      <Text c="dimmed">※この操作は取り消すことができません。</Text>
      <Button
        variant="light"
        radius="lg"
        color="green"
        rightSection={<IconCheck size={14} />}
        onClick={() => {
          handleSubmit();
          setModalOpened(false);
        }}
      >
        読み終える
      </Button>
    </Stack>
  );
}
