import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { BookWithMemos } from '@/types/index';
import { axiosPost } from '@/lib/axios';

export default function useAddHeading() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleAddHeading = async (
    bookWithMemos: BookWithMemos,
    number: number,
  ) => {
    try {
      const res = await axiosPost('/headings', token, {
        userBookId: bookWithMemos.id,
        number,
      });
      if (res.status === 200) {
        toast.success('章を追加しました。');
        return {
          id: res.data.id,
          number,
          title: '',
          memo: { id: res.data.memo.id, body: '' },
        };
      } else {
        throw new Error();
      }
    } catch (error) {
      console.warn(error);
      toast.error('章の追加に失敗しました。');
    }
  };

  return { handleAddHeading };
}
