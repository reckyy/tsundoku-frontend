import { Anchor, Container, Group, Text, Title } from '@mantine/core';
import classes from './NotFound.module.css';

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>ページが見つかりません</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        お探しのページは存在しないか、移動された可能性があります。 URL
        をご確認いただくか、トップページからやり直してください。
      </Text>
      <Group justify="center">
        <Anchor href="/" size="md">
          ホームに戻る
        </Anchor>
      </Group>
    </Container>
  );
}
