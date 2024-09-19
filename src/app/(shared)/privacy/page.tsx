import Privacy from '@/components/footer/Privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Tsundokuのプライバシーポリシーのページです。',
};

export default function Page() {
  return <Privacy />;
}
