import toast from 'react-hot-toast';
import { apiDelete } from '@/lib/api/client';
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
      await apiDelete(`/user_books/${userBookId}`, token);
      onSuccess();
      toast('本を削除しました。');
    } catch (error) {
      console.warn(error);
      toast.error('本の削除に失敗しました。');
    }
  };

  return { handleDeleteBook };
}
