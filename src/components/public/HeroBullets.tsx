import {
  Container,
  Text,
  Image,
  Center,
  Anchor,
  Space,
  Title,
} from '@mantine/core';

export default function HeroBullets() {
  const baseUrl: string = process.env.NEXT_PUBLIC_NEXT_URL ?? '';

  return (
    <Container my="md">
      <Center>
        <Image src="Tsundoku.png" alt="Logo" w={120} h={120} />
      </Center>
      <Space h={20} />
      <Title size={'h3'} ta={'center'}>
        Tsundoku
      </Title>
      <Space h={20} />
      <Space h={20} />
      <Text size="lg" ta={'center'} mb={5}>
        「読書はしたいと思っているが、先延ばししがちで読書習慣を継続できない、、」
      </Text>
      <Text size="lg" ta={'center'} mb={5}>
        「読書習慣をアウトプットしたいけど、方法がない、、」
      </Text>
      <Text size="lg" ta={'center'} mb={40}>
        Tsundokuはそんなあなたのためのサービスです。
      </Text>
      <Text size="lg" mb={5}>
        Tsundokuでは、読書を通じて得た気づきや感想を簡単にメモし、読書ログを作成できます。
      </Text>
      <Text size="lg" mb={5}>
        あなたの読書履歴とログを公開することで、モチベーションを維持しながら読書を継続できます。
      </Text>
      <Text size="lg" mb={20}>
        一緒に読書習慣を作りましょう！
      </Text>
      <Anchor href={`${baseUrl}/about`} underline="always" variant="light">
        何ができるのか？
      </Anchor>
    </Container>
  );
}
