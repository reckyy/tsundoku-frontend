'use client';

import { useEffect } from 'react';
import DefaultError from '@/components/error/DefaultError';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <DefaultError reset={reset} />;
}
