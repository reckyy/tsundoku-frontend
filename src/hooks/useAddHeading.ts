import toast from 'react-hot-toast';
import { axiosInstance, setHeader } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import { BookWithMemos } from '@/types/index';

const useAddHeading = () => {
  const { data: session } = useSession();

  const handleAddHeading = async (
    bookWithMemos: BookWithMemos,
    number: number,
  ) => {
    await setHeader(session?.user?.accessToken);
    try {
      const res = await axiosInstance.post('/headings', {
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
};

export default useAddHeading;
