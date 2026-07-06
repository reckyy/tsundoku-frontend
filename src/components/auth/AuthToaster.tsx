'use client';

import toast from 'react-hot-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const messages = {
  success: 'ログインしました！',
  error: 'ログインが必要です。',
};

export const AuthToaster = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const authenticated = searchParams.get('authenticated');
    if (authenticated !== 'true' && authenticated !== 'false') return;

    if (authenticated === 'true') {
      toast.success(messages.success);
    } else {
      toast.error(messages.error);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('authenticated');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
};
