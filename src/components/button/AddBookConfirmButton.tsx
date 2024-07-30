import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import AddBookConfirmContent from '../modal/AddBookConfirmContent';
import { SessionProvider } from 'next-auth/react';
import { BookProps } from '@/types/index';
import { IconBookUpload } from '@tabler/icons-react';

const AddBookConfirmButton = ({ book }: BookProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <SessionProvider>
      <Modal opened={opened} onClose={close} title="" centered>
        <AddBookConfirmContent book={book} />
      </Modal>

      <Button
        justify="flex-end"
        rightSection={<IconBookUpload size={14} />}
        variant="light"
        onClick={open}
      >
        本棚に追加
      </Button>
    </SessionProvider>
  );
};

export default AddBookConfirmButton;
