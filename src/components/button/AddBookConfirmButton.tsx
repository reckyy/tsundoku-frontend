import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import AddBookConfirmContent from '../modal/AddBookConfirmContent';
import { SessionProvider } from 'next-auth/react';
import { BookProps } from '@/types/index';

const AddBookConfirmButton = ({ book }: BookProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <SessionProvider>
      <Modal opened={opened} onClose={close} title="" centered>
        <AddBookConfirmContent book={book} />
      </Modal>

      <Button onClick={open}>本棚に追加</Button>
    </SessionProvider>
  );
};

export default AddBookConfirmButton;
