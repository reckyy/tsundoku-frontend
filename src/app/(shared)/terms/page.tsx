import Terms from '@/components/footer/Terms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'Tsundokuの利用規約のページです。',
};

export default function Page() {
  return <Terms />;
}
