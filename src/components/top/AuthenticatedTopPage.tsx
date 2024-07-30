import { Container, Space, Paper, Text } from '@mantine/core';
import AuthenticatedBookItems from '@/components/bookshelf/AuthenticatedBookItems';
import Cal from '@/components/Cal/Cal';

export default function AuthenticatedTopPage() {
  return (
    <Container my="md">
      <AuthenticatedBookItems />
      <Space h={60} />
      <Paper withBorder shadow="xs" radius="md" p="xl">
        <Text ta={'center'}>毎日、コツコツと。</Text>
        <Space h={20} />
        <Cal />
      </Paper>
    </Container>
  );
}
