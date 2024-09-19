import ConfirmDeletion from '@/components/confirm/ConfirmDeletion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '退会ページ',
};

export default function Page() {
  return <ConfirmDeletion />;
}
