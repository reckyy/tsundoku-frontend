import type { Metadata } from 'next';
import TopLoading from '@/components/loading/TopLoading';
import TopPageContent from '@/components/pageContent/TopPageContent';
import { Suspense } from 'react';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Tsundoku',
  description:
    'Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！',
};

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:title" content="Tsundoku" />
        <meta
          property="og:description"
          content="Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！"
        />
        <meta
          property="og:image"
          content="https://tsundoku.tech/images/tsundoku.png"
        />
        <meta property="og:url" content="https://tsundoku.tech" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tsundoku" />
        <meta
          name="twitter:description"
          content="Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！"
        />
        <meta
          name="twitter:image"
          content="https://tsundoku.tech/images/tsundoku.png"
        />
      </Head>
      <Suspense fallback={<TopLoading />}>
        <TopPageContent />
      </Suspense>
    </>
  );
}
