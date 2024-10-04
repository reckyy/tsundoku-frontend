import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { axiosInstance, setHeader } from '@/lib/axios';

const useDeleteUser = (id: string, token: string) => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    await setHeader(token);
    try {
      const res = await axiosInstance.delete(`/users/${id}`);
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
