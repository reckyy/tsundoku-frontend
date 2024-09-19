import SearchHome from '@/components/search/SearchHome';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '本の検索',
};

export default function Page() {
  return <SearchHome />;
}
