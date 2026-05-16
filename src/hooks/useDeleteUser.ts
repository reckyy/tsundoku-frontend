import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { axiosDelete } from '@/lib/axios';
import { useSession } from 'next-auth/react';

export default function useDeleteUser() {
  const { data: session } = useSession();

  const handleDeleteUser = async () => {
    const token = session?.user?.accessToken;
    try {
      const res = await axiosDelete(`/users/${session?.user?.id}`, token);
      if (res.status === 204) {
        await signOut({ callbackUrl: '/thanks' });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.warn(error);
      toast.error('退会に失敗しました。');
    }
  };

  return { handleDeleteUser };
}
