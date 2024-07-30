import {
  Title,
  Divider,
  Image,
  Grid,
  GridCol,
  Card,
  Text,
} from '@mantine/core';

export default function EditorFeature() {
  return (
    <>
      <Title order={3}>メモ画面</Title>
      <Divider my="md" />
      <Grid>
        <GridCol offset={1} span={10}>
          <Card withBorder style={{ backgroundColor: '#f1f3f5' }}>
            <Image src="editor.png" alt="エディタの画像" />
          </Card>
        </GridCol>
        <GridCol>
          <Text size="lg">Tsundokuでは章ごとにメモを取ることができます。</Text>
          <Text size="lg">
            メモを始める際は章のタイトルを入力後、メモを書き始めてください。
          </Text>
          <Text size="lg">基本的なマークダウン記法はサポートしています。</Text>
          <Text>
            ※現状コードブロックはrubyとTypeScriptのみをサポートしています。将来もしリクエストがあれば拡張する予定です。
          </Text>
        </GridCol>
      </Grid>
    </>
  );
}
