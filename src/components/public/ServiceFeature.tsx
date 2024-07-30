import {
  Text,
  Grid,
  GridCol,
  Image,
  Flex,
  Space,
  List,
  ListItem,
} from '@mantine/core';

export default function ServiceFeature() {
  return (
    <Grid>
      <GridCol span={12}>
        <Text size="xl" td="underline" ta={'center'}>
          Tsundokuの基本的な使い方
        </Text>
      </GridCol>
      <GridCol span={12}>
        <Space h={20} />
      </GridCol>
      <GridCol span={{ base: 12, sm: 6 }}>
        <Flex gap="sm" justify="center" align="center" direction="column">
          <Text size="lg">
            Tsundokuは、日々の読書習慣をサポートするためのサービスです。以下のステップに従って、継続的な読書習慣を身につけましょう。
          </Text>
          <List type="ordered" size="lg" spacing="xs" withPadding>
            <ListItem fw={600}>読む本を登録</ListItem>
            <Text size="md">まず、読みたい本をTsundokuに登録します。</Text>
            <ListItem fw={600}>章ごとにメモを取る</ListItem>
            <Text size="md">
              本を読み進めながら、各章ごとにメモを取ります。
            </Text>
            <ListItem fw={600}>1日1章メモをつけるごとにログとして記録</ListItem>
            <Text size="md">
              毎日、1章につき1つのメモを記録します。例えば、1日に3章読んだ場合、3つのメモがログとして記録されます。また、同じ章を2日に分けてメモを取った場合、それぞれの日に1つずつログが追加されます。
            </Text>
          </List>
        </Flex>
      </GridCol>
      <GridCol span={{ base: 12, sm: 6 }}>
        <Image src="BookIllustration.png" alt="failed to load" />
      </GridCol>
    </Grid>
  );
}
