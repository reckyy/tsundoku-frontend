import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Book } from '@/types/index';
import { clientAxiosPost } from '@/lib/clientAxios';

const useAddBook = (book: Book) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    const token = session?.user?.accessToken;
    try {
      await clientAxiosPost('/books', token, {
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
      });
      clientAxiosPost('/user_books', token, {
        title: book.title,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
      });
      router.push('/');
      router.refresh();
      toast.success('本を保存しました！');
    } catch (error) {
      toast.error('本の保存に失敗しました。');
    }
  };

  return { handleSubmit };
};

export default useAddBook;
