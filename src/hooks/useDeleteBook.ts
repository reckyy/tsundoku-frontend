import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { axiosInstance, setHeader } from '@/lib/axios';

const useDeleteBook = (userBookId: number, token: string) => {
  const router = useRouter();

  const handleDeleteBook = async () => {
    await setHeader(token!);
    try {
      const res = await axiosInstance.delete(`/user_books/${userBookId}`, {
        params: {
          userBookId,
        },
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
