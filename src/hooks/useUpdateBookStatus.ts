import { useSession } from 'next-auth/react';
import { apiPatch } from '@/lib/api/client';

export default function useUpdateBookStatus() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleUpdateBookStatus = async (userBookId: number, status: string) => {
    await apiPatch(`/user_books/${userBookId}`, token, { status });
  };

  return { handleUpdateBookStatus };
}
