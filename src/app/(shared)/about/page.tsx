import AboutPageContent from '@/components/pageContent/AboutPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tsundokuの使い方',
  description:
    'Tsundokuは、日々の読書習慣をサポートするためのサービスです。以下のステップに従って、継続的な読書習慣を身につけましょう。',
};

export default function Page() {
  return <AboutPageContent />;
}
