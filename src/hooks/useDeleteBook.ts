import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { axiosInstance, setHeader } from '@/lib/axios';
import { useSession } from 'next-auth/react';

const useDeleteBook = (userBookId: number) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteBook = async () => {
    await setHeader(session?.user?.accessToken);
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
