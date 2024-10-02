import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { UserBook } from '@/types/index';
import axiosInstance from '@/lib/axios';

const useAddBook = (book: UserBook) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const [value, setValue] = useState<string | number>('');

  const handleSubmit = async () => {
    if (value === '') {
      toast.error('章の数を入力してください。');
      return;
    }

    try {
      await axiosInstance.post('/books', {
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
        userId,
        headingNumber: value,
      });
      router.push('/');
      router.refresh();
      toast.success('本を保存しました！');
    } catch (error) {
      toast.error('本の保存に失敗しました。');
    }
  };

  return { value, setValue, handleSubmit };
};

export default useAddBook;
