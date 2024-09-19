import ServiceFeature from '@/components/public/ServiceFeature';
import UserMenuFeature from '@/components/public/UserMenuFeature';
import EditorFeature from '@/components/public/EditorFeature';
import { Container, Space } from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tsundokuの使い方',
  description:
    'Tsundokuは、日々の読書習慣をサポートするためのサービスです。以下のステップに従って、継続的な読書習慣を身につけましょう。',
};

export default function Page() {
  return (
    <Container my="md">
      <ServiceFeature />
      <Space h={60} />
      <UserMenuFeature />
      <Space h={20} />
      <EditorFeature />
    </Container>
  );
}
