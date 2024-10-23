'use client';

import MemoPageContent from '@/components/pageContent/MemoPageContent';
import { SessionProvider } from 'next-auth/react';

export default function Page() {
  return (
    <SessionProvider>
      <MemoPageContent />
    </SessionProvider>
  );
}
