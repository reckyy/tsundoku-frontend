import {
  Title,
  Divider,
  Image,
  Grid,
  GridCol,
  Card,
  Text,
  Code,
} from '@mantine/core';

export default function EditorFeature() {
  const codeblockContent = `# 見出し（６まであります）
- 箇条書き
1. 番号リスト
- [ ] チェックボックス
**太字**
> 引用
~~取り消し線~~
--- 区切り線
\`インラインコード\`
\`\`\`言語
コードブロック
Rubyの場合は「言語」のところにrb、TypeScriptの場合はtsと書いてください。
\`\`\``;

  return (
    <>
      <Title order={2}>メモ画面</Title>
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
            メモを始める際は読書ステータスを「読んでる途中」に変更後、メモを書き始めてください。
          </Text>
          <Text size="lg">サポートしているMarkdown記法は以下です。</Text>
          <Code block>{codeblockContent}</Code>
          <Text>
            ※現状コードブロックはrubyとTypeScriptのみをサポートしています。将来もしリクエストがあれば拡張する予定です。
          </Text>
        </GridCol>
      </Grid>
    </>
  );
}
