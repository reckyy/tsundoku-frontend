import { Text, Button, Stack } from '@mantine/core';
import useUpdateBookStatus from '@/hooks/useUpdateBookStatus';
import { IconPlayerPlay } from '@tabler/icons-react';
import { BookWithMemos } from '@/types/book';

type ChangeToReadingModalProps = {
  userBookId: number;
  setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setBookWithMemos: React.Dispatch<
    React.SetStateAction<BookWithMemos | undefined>
  >;
};

export default function ChangeToReadingModal({
  userBookId,
  setModalOpened,
  setBookWithMemos,
}: ChangeToReadingModalProps) {
  const { handleSubmit } = useUpdateBookStatus({
    userBookId,
    status: 'reading',
    setBookWithMemos,
  });

  return (
    <Stack align="center" justify="center">
      <Text size="lg" fw={700}>
        本を読み始めますか？
      </Text>
      <Text c="dimmed">※この操作は取り消すことができません。</Text>
      <Button
        variant="light"
        radius="lg"
        color="green"
        rightSection={<IconPlayerPlay size={14} />}
        onClick={() => {
          handleSubmit();
          setModalOpened(false);
        }}
      >
        読書を始める
      </Button>
    </Stack>
  );
}
