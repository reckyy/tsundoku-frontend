import {
  Text,
  Title,
  Container,
  Divider,
  Alert,
  List,
  ListItem,
  Stack,
  Space,
  Center,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { auth } from '#auth';
import DeleteAccountButton from '../button/DeleteAccountButton';

export default async function ConfirmDeletion() {
  const session = await auth();
  return (
    <Container my="md">
      <Title order={3} ta="center">
        アカウントを削除しますか？
      </Title>
      <Divider my="md" />
      <Alert variant="light" color="red" title="" icon={<IconInfoCircle />}>
        <Stack align="flex-start" justify="flex-start">
          <div>
            アカウントを削除すると、以下の情報も全て削除されます。
            <Text size="sm" c="red">
              復元することはできません。
            </Text>
          </div>
          <List size="md" withPadding>
            <ListItem>ユーザーの情報</ListItem>
            <ListItem>登録した本</ListItem>
            <ListItem>メモやログ</ListItem>
            <ListItem>公開ページ</ListItem>
          </List>
        </Stack>
      </Alert>
      <Space h={30} />
      <Center>
        <DeleteAccountButton uid={session?.user?.id} />
      </Center>
    </Container>
  );
}
