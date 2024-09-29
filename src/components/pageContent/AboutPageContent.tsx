import ServiceFeature from '@/components/public/ServiceFeature';
import UserMenuFeature from '@/components/public/UserMenuFeature';
import EditorFeature from '@/components/public/EditorFeature';
import { Container, Space } from '@mantine/core';

export default function AboutPageContent() {
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
