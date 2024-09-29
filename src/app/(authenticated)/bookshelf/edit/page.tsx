import type { Metadata } from 'next';
import BookShelfPageContent from '@/components/pageContent/BookShelfPageContent';

export const metadata: Metadata = {
  title: '本棚編集',
};

export default function Page() {
  return <BookShelfPageContent />;
}
