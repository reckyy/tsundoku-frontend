import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { clientAxiosPatch } from '@/lib/clientAxios';
import { BookWithMemos } from '@/types/book';

type useUpdateBookStatusProps = {
  userBookId: number;
  setBookWithMemos: React.Dispatch<
    React.SetStateAction<BookWithMemos | undefined>
  >;
};

const useUpdateBookStatus = ({
  userBookId,
  setBookWithMemos,
}: useUpdateBookStatusProps) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleSubmit = async (status: string) => {
    try {
      await clientAxiosPatch(`/user_books/${userBookId}`, token, {
        userBookId,
        status,
      });
      setBookWithMemos((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          status,
        };
      });
      toast.success('読書ステータスを更新しました！');
    } catch (error) {
      toast.error('読書ステータスの更新に失敗しました。');
    }
  };

  return { handleSubmit };
};

export default useUpdateBookStatus;
