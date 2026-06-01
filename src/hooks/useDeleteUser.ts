import { useState } from 'react';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { apiDelete } from '@/lib/api/client';
import { useSession } from 'next-auth/react';

export default function useDeleteUser() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteUser = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const token = session?.user?.accessToken;
    try {
      await apiDelete(`/users/${session?.user?.id}`, token);
      await signOut({ callbackUrl: '/thanks' });
    } catch (error) {
      console.warn(error);
      toast.error('退会に失敗しました。');
      setIsSubmitting(false);
    }
  };

  return { handleDeleteUser, isSubmitting };
}
