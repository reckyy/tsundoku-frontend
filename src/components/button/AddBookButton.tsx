import { Button } from '@mantine/core';
import { Book } from '@/types/index';
import { IconBookUpload } from '@tabler/icons-react';
import useAddBook from '@/hooks/useAddBook';

export default function AddBookButton({ book }: { book: Book }) {
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
}
