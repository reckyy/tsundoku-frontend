import type { Metadata } from 'next';
import TopLoading from '@/components/loading/TopLoading';
import TopPageContent from '@/components/pageContent/TopPageContent';
import { Suspense } from 'react';

const imageUrl = 'https://tsundoku.tech/images/tsundoku.png';

export const metadata: Metadata = {
  title: 'Tsundoku',
  description:
    'Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！',
  openGraph: {
    title: 'Tsundoku',
    description: '読書習慣を身につけよう。',
    images: {
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    url: 'https://tsundoku.tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsundoku',
    description: '読書習慣を身につけよう。',
    images: imageUrl,
  },
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<TopLoading />}>
        <TopPageContent />
      </Suspense>
    </>
  );
}
