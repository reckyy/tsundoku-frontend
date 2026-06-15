import type { Metadata } from 'next';
import { auth } from '@/auth';
import TopLoading from '@/components/loading/TopLoading';
import TopPage from '@/components/top/TopPage';
import TopPageContent from '@/components/pageContent/TopPageContent';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tsundoku',
  description:
    'Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！',
  openGraph: {
    title: 'Tsundoku',
    description: '読書習慣を身につけよう。',
    url: 'https://tsundoku.tech',
    images: [
      {
        url: 'https://tsundoku.tech/ogp.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsundoku',
    description: '読書習慣を身につけよう。',
    images: [
      {
        url: 'https://tsundoku.tech/ogp.png',
      },
    ],
  },
};

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return <TopPage />;
  }

  return (
    <Suspense fallback={<TopLoading />}>
      <TopPageContent />
    </Suspense>
  );
}
