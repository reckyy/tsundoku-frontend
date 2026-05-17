import { useSession } from 'next-auth/react';
import { apiPatch } from '@/lib/api/client';

export default function useUpdateBookStatus(userBookId?: number) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleUpdateBookStatus = async (status: string) => {
    if (!userBookId) throw new Error();
    await apiPatch(`/user_books/${userBookId}`, token, {
      userBookId,
      status,
    });
  };

  return { handleUpdateBookStatus };
}
