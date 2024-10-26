import { Container, Text, Image, Center, Space, Title } from '@mantine/core';

export default function HeroBullets() {
  return (
    <Container my="md">
      <Space h={40} />
      <Center>
        <Image src="TopPageTsundoku.png" alt="Logo" w={300} h={300} />
      </Center>
      <Space h={20} />
      <Title ta="center" size={'h2'}>
        読書習慣を身につけよう
      </Title>
      <Space h={40} />
      <Text size="md" ta="center" mb={5}>
        読書を通じて得た気づきや感想を簡単にメモし、読書ログを作成。
      </Text>
      <Text size="md" ta="center" mb={5}>
        読書ログを公開することで、モチベーションを維持しながら読書を継続できます。
      </Text>
    </Container>
  );
}
