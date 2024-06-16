import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import AddBookConfirmContent from '../modal/AddBookConfirmContent';
import { SessionProvider } from 'next-auth/react';

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

type BookProps = {
  book: Book;
};

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
