import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
} from '@mantine/core';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import type { PropsWithChildren } from 'react';
import { auth } from '@/auth';

export default async function MyAppShell({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: { xs: 120, sm: 80, md: 80 } }}
      padding="md"
    >
      {session?.user && (
        <AppShellHeader>
          <Header />
        </AppShellHeader>
      )}

      <AppShellMain>{children}</AppShellMain>
      <AppShellFooter p="md" visibleFrom="sm">
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
