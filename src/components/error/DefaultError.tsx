import {
  Anchor,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';

type Props = {
  reset: () => void;
};

export default function DefaultError({ reset }: Props) {
  return (
    <Center style={{ width: '100vw', height: '80vh' }}>
      <Stack align="center" gap="md">
        <Title order={2} ta="center">
          予期しないエラーが発生しました
        </Title>
        <Text c="dimmed" ta="center">
          もう一度お試しいただくか、トップページに戻ってください。
        </Text>
        <Group justify="center">
          <Button onClick={reset}>再試行</Button>
          <Anchor href="/">ホームに戻る</Anchor>
        </Group>
      </Stack>
    </Center>
  );
}
