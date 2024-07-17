import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
} from '@mantine/core';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import type { PropsWithChildren } from 'react';

export async function MyAppShell({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 80 }} padding="md">
      <AppShellHeader>
        <Header />
      </AppShellHeader>

      <AppShellMain>{children}</AppShellMain>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
