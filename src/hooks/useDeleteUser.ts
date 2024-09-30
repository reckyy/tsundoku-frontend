import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { API_CONSTS } from '@/consts/apiConsts';

const useDeleteUser = (userId: string | string[] | undefined) => {
  const { RAILS_API_URL } = API_CONSTS;
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`${RAILS_API_URL}/users/${userId}`, {
        params: { userId },
      });
      if (res.status === 204) {
        signOut();
        router.push('/thanks');
        router.refresh();
        toast.success('アカウントを削除しました。');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('退会に失敗しました。');
    }
  };

  return { handleDeleteUser };
};

export default useDeleteUser;
