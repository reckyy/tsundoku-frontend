import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellFooter,
} from '@mantine/core';
import { Header } from '@/components/header/Header';
import { auth } from '#auth';
import SignInButton from '@/components/button/SignInButton';
import { Footer } from '@/components/footer/Footer';
import type { PropsWithChildren } from 'react';

export async function MyAppShell({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 80 }} padding="md">
      <AppShellHeader>
        <Header />
      </AppShellHeader>

      <AppShellMain>{session ? children : <SignInButton />}</AppShellMain>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
