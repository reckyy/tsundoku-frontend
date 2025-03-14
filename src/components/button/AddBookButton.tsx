import { Button } from '@mantine/core';
import { Book } from '@/types/index';
import { IconBookUpload } from '@tabler/icons-react';
import useAddBook from '@/hooks/useAddBook';

const AddBookButton = ({ book }: { book: Book }) => {
  const { handleSubmit } = useAddBook(book);

  return (
    <>
      <Button
        justify="flex-end"
        rightSection={<IconBookUpload size={14} />}
        variant="light"
        onClick={handleSubmit}
      >
        本棚に追加
      </Button>
    </>
  );
};

export default AddBookButton;
