import type { PropsWithChildren } from 'react';
import { AuthSessionProvider } from '@/components/auth/AuthSessionProvider';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}
