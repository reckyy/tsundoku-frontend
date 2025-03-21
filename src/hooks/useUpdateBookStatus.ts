import { useSession } from 'next-auth/react';
import { axiosPatch } from '@/lib/axios';

export default function useUpdateBookStatus(userBookId?: number) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleUpdateBookStatus = async (status: string) => {
    if (!userBookId) throw new Error();
    await axiosPatch(`/user_books/${userBookId}`, token, {
      userBookId,
      status,
    });
  };

  return { handleUpdateBookStatus };
}
