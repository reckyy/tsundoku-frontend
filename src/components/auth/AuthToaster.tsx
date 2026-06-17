'use client';

import toast from 'react-hot-toast';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const messages = {
  success: 'ログインしました！',
};

export const AuthToaster = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get('authenticated') !== 'true') return;

    toast.success(messages.success);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('authenticated');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [searchParams, pathname, router]);

  return null;
};
