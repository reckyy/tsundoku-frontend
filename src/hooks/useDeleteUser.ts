import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import axiosInstance from '@/lib/axios';

const useDeleteUser = (userId: string | string[] | undefined) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      const res = await axiosInstance.delete(`/users/${userId}`, {
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
