'use client';

import UserPageContent from '@/components/pageContent/UserPageContent';
import { SessionProvider } from 'next-auth/react';

export default function Page() {
  return (
    <SessionProvider>
      <UserPageContent />
    </SessionProvider>
  );
}
