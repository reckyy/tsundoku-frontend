import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import type { PropsWithChildren } from 'react';
import { auth } from '@/auth';

export default async function MyAppShell({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      {session?.user && (
        <AppShellHeader>
          <Header />
        </AppShellHeader>
      )}
      <AppShellMain>
        <div style={{ minHeight: '100vh' }}>{children}</div>
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
