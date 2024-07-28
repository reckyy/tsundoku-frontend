import { Image, SimpleGrid, Title, Text, Container } from '@mantine/core';
import { FeatureProps } from '@/types/feature';

export default function Feature({ title, src, introduction }: FeatureProps) {
  return (
    <Container my="md">
      <Title order={2}>{title}</Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        mt={30}
        spacing={{ base: 30, sm: 60 }}
        pb={60}
      >
        <Image src={src} alt="仮の画像" radius="md" />
        <Text size="lg">{introduction}</Text>
      </SimpleGrid>
    </Container>
  );
}
