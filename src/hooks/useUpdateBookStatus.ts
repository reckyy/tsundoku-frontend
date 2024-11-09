import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { axiosInstance, setHeader } from '@/lib/axios';
import { BookWithMemos } from '@/types/book';

type useUpdateBookStatusProps = {
  userBookId: number;
  status: string;
  setBookWithMemos: React.Dispatch<
    React.SetStateAction<BookWithMemos | undefined>
  >;
};

const useUpdateBookStatus = ({
  userBookId,
  status,
  setBookWithMemos,
}: useUpdateBookStatusProps) => {
  const { data: session } = useSession();
  const token = session?.user?.idToken;

  const handleSubmit = async () => {
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
      toast.success(
        status === 'reading' ? '読書を開始しました！' : '読了しました！',
      );
    } catch (error) {
      toast.error('読書の開始に失敗しました。');
    }
  };

  return { handleSubmit };
};

export default useUpdateBookStatus;
