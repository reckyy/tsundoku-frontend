import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Book } from '@/types/index';
import { axiosInstance, setHeader } from '@/lib/axios';

const useAddBook = (book: Book) => {
  const { data: session } = useSession();
  const token = session?.user?.idToken;
  const router = useRouter();
  const [value, setValue] = useState<string | number>('');

  const handleSubmit = async () => {
    if (value === '') {
      toast.error('章の数を入力してください。');
      return;
    }

    await setHeader(token!);
    try {
      await Promise.all([
        axiosInstance.post('/books', {
          title: book.title,
          author: book.author,
          coverImageUrl: book.coverImageUrl,
        }),
        axiosInstance.post('/user_books', {
          title: book.title,
          author: book.author,
          coverImageUrl: book.coverImageUrl,
          headingNumber: value,
        }),
      ]);
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
