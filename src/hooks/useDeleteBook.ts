import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BookMenuProps } from '@/types/index';
import axiosInstance from '@/lib/axios';

const useDeleteBook = (params: BookMenuProps) => {
  const router = useRouter();

  const handleDeleteBook = async () => {
    try {
      const res = await axiosInstance.delete(`/user_books/${params.bookId}`, {
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
