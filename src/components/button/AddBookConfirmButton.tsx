import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import AddBookConfirmModal from '../modal/AddBookConfirmModal';
import { Book } from '@/types/index';
import { IconBookUpload } from '@tabler/icons-react';

const AddBookConfirmButton = ({ book }: { book: Book }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="" centered>
        <AddBookConfirmModal book={book} />
      </Modal>

      <Button
        justify="flex-end"
        rightSection={<IconBookUpload size={14} />}
        variant="light"
        onClick={open}
      >
        本棚に追加
      </Button>
    </>
  );
};

export default AddBookConfirmButton;
