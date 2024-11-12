import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { axiosInstance, setHeader } from '@/lib/axios';
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
  const token = session?.user?.idToken;

  const handleSubmit = async (status: string) => {
    await setHeader(token!);
    try {
      await axiosInstance.patch(`/user_books/${userBookId}`, {
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
