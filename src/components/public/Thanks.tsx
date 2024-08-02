import {
  Container,
  Grid,
  GridCol,
  Image,
  Title,
  Text,
  Anchor,
  Center,
} from '@mantine/core';

export default function Thanks() {
  return (
    <Container my="md">
      <Grid>
        <GridCol offset={3} span={6}>
          <Image src="thanku.png" alt="感謝の画像" />
        </GridCol>
        <GridCol>
          <Title order={3} ta="center">
            Tsundokuを使っていただきありがとうございました。
          </Title>
        </GridCol>
        <GridCol>
          <Text size="lg" ta="center">
            もしまた気が向けば、使っていただけると嬉しいです！
          </Text>
        </GridCol>
        <GridCol>
          <Center>
            <Anchor href="/">最初のページへ</Anchor>
          </Center>
        </GridCol>
      </Grid>
    </Container>
  );
}
