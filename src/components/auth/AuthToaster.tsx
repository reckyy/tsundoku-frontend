'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const messages = {
  success: 'ログインしました！',
};

export const AuthToaster = () => {

  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<string | null>(null);

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const authenticatedParams = params.get('authenticated');
      setAuthenticated(authenticatedParams);

      if (authenticated === 'true') {
        toast.success(messages.success);

        params.delete('authenticated');
        router.replace(`${window.location.pathname}?${params.toString()}`);
      }
  }, [authenticated, router]);

  return null;
};
