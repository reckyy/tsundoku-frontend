import { Inter } from 'next/font/google';
import './globals.css';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import { AuthToaster } from '@/components/auth/AuthToaster';
import MyAppShell from '@/components/appShell/MyAppShell';

const inter = Inter({ subsets: ['latin'] });

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
              <Toaster />
              <AuthToaster />
              {children}
            </MyAppShell>
          </MantineProvider>
        </main>
      </body>
    </html>
  );
}
