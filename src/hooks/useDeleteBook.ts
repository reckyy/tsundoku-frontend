import toast from 'react-hot-toast';
import { axiosDelete } from '@/lib/axios';
import { useSession } from 'next-auth/react';

type useDeleteBookProps = {
  userBookId: number;
  onSuccess: () => void;
};

export default function useDeleteBook({
  userBookId,
  onSuccess,
}: useDeleteBookProps) {
  const { data: session } = useSession();

  const handleDeleteBook = async () => {
    const token = session?.user?.accessToken;
    try {
      const res = await axiosDelete(`/user_books/${userBookId}`, token);
      if (res.status === 204) {
        onSuccess();
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
