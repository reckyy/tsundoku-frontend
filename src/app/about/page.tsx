import UserMenuFeature from '@/components/public/UserMenuFeature';
import { Container, Text } from '@mantine/core';

export default function Page() {
  return (
    <Container my="md">
      <Text size="xl" td="underline" ta={'center'}>
        Tsundokuの使い方
      </Text>
      <UserMenuFeature />
    </Container>
  );
}
