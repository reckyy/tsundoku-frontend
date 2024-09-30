import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { UserBook } from '@/types/index';
import { API_CONSTS } from '@/consts/apiConsts';

const useAddBook = (book: UserBook) => {
  const { RAILS_API_URL } = API_CONSTS;
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
      await axios.post(`${RAILS_API_URL}/books`, {
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
