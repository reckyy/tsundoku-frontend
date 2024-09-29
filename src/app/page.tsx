import type { Metadata } from 'next';
import TopLoading from '@/components/loading/TopLoading';
import TopPageContent from '@/components/pageContent/TopPageContent';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tsundoku',
  description:
    'Tsundokuは読書が続かない人、積読しがちな人向けの読書管理アプリです。読んできた本の一覧表示と読書ログを公開することにより、外部に読書習慣をアピールできます！',
};

export default function Home() {
  return (
    <Suspense fallback={<TopLoading />}>
      <TopPageContent />
    </Suspense>
  );
}
