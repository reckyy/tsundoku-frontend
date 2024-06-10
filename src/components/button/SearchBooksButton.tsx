'use client';

import { Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const SearchBooksButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="light"
      rightSection={<IconArrowRight size={14} />}
      onClick={() => router.push('/search_books')}
    >
      本を追加
    </Button>
  );
};

export default SearchBooksButton;
