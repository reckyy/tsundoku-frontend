import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { handleSignOut } from '@/feature/SignOut';

const useDeleteUser = (userId: string | string[] | undefined) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_RAILS_API_URL;

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/users/${userId}`, {
        params: { userId },
      });
      if (res.status === 204) {
        handleSignOut();
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
