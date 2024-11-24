import ServiceFeature from '@/components/public/ServiceFeature';
import EditorFeature from '@/components/public/EditorFeature';
import { Container, Space } from '@mantine/core';

export default function AboutPageContent() {
  return (
    <Container my="md">
      <ServiceFeature />
      <Space h={60} />
      <EditorFeature />
    </Container>
  );
}
