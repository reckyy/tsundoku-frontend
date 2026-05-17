import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { BookWithMemos } from '@/types/index';
import { apiPost } from '@/lib/api/client';

export default function useAddHeading() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleAddHeading = async (
    bookWithMemos: BookWithMemos,
    number: number,
  ) => {
    try {
      const data = await apiPost('/headings', token, {
        userBookId: bookWithMemos.id,
        number,
      });
      toast.success('章を追加しました。');
      return {
        id: data.id,
        number,
        title: '',
        memo: { id: data.memo.id, body: '' },
      };
    } catch (error) {
      console.warn(error);
      toast.error('章の追加に失敗しました。');
    }
  };

  return { handleAddHeading };
}
