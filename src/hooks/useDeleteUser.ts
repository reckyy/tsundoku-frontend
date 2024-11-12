import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { axiosInstance, setHeader } from '@/lib/axios';
import { useSession } from 'next-auth/react';

const useDeleteUser = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteUser = async () => {
    await setHeader(session?.user?.accessToken);
    try {
      const res = await axiosInstance.delete(`/users/${session?.user?.id}`);
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
