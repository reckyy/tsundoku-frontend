import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { axiosDelete } from '@/lib/axios';
import { useSession } from 'next-auth/react';

export default function useDeleteBook(userBookId: number) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteBook = async () => {
    const token = session?.user?.accessToken;
    try {
      const res = await axiosDelete(`/user_books/${userBookId}`, token);
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
}
