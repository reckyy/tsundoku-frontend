'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const messages = {
  logOut: 'ログアウトしました。',
  success: 'ログインしました！',
};

export const AuthToaster = () => {

  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行されることを保証
    const params = new URLSearchParams(window.location.search);
    const authenticatedCode = params.get('authenticated');
    setCode(authenticatedCode);
  }, []);

  useEffect(() => {
    if (code) {
      toast.success(messages.success);

      // URLからauthenticatedパラメータを削除
      const params = new URLSearchParams(window.location.search);
      params.delete('authenticated');
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  }, [code, router]);

  return null;
};
