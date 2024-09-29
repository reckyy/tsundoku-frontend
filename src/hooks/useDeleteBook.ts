import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BookMenuProps } from '@/types/index';

const useDeleteBook = (params: BookMenuProps) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_RAILS_API_URL;

  const handleDeleteBook = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/user_books/${params.bookId}`, {
        params,
      });
      if (res.status === 204) {
        router.refresh();
        toast('本を削除しました。');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('本の削除に失敗しました。');
    }
  };

  return { handleDeleteBook };
};

export default useDeleteBook;
