import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import AuthGuard from '@/components/feature/AuthGuard';
import { Toaster } from 'react-hot-toast';
import { AuthToaster } from '@/components/auth/AuthToaster';
import { MyAppShell } from '@/components/appShell/MyAppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <MantineProvider>
            <MyAppShell>
              <AuthGuard>
                <Toaster />
                <AuthToaster />
                {children}
              </AuthGuard>
            </MyAppShell>
          </MantineProvider>
        </main>
      </body>
    </html>
  );
}
