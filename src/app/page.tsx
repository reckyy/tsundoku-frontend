import AuthenticatedBookItems from '@/components/bookshelf/AuthenticatedBookItems';
import Cal from '@/components/Cal/Cal';
import { auth } from '#auth';
import TopPage from '@/components/top/TopPage';
import { Container, Space } from '@mantine/core';

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <Container my="md">
        <AuthenticatedBookItems />
        <Space h={60} />
        <Cal />
      </Container>
    );
  } else {
    return <TopPage />;
  }
}
