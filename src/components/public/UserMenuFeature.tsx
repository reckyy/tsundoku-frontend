import {
  Image,
  SimpleGrid,
  Title,
  Text,
  List,
  ListItem,
  ThemeIcon,
  Card,
  rem,
  Space,
} from '@mantine/core';
import { IconCircleCheck, IconTrash } from '@tabler/icons-react';

export default function UserMenuFeature() {
  return (
    <>
      <Title order={2}>メニューについて</Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        mt={30}
        spacing={{ base: 30, sm: 60 }}
        pb={60}
      >
        <Card withBorder>
          <Image src={'UserMenu.png'} alt="仮の画像" radius="md" />
        </Card>
        <div>
          <Text size="lg">ログイン後、使用できるメニューです。</Text>
          <Space h={20} />
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            <ListItem>ログアウトします。</ListItem>
            <ListItem>本検索ページへ遷移します。</ListItem>
            <ListItem>
              あなたの読書記録の公開ページのリンクをコピーします。
            </ListItem>
            <ListItem
              icon={
                <ThemeIcon color="red" size={24} radius="xl">
                  <IconTrash style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              }
            >
              退会します。この際、あなたのデータはすべて削除されます。
            </ListItem>
          </List>
        </div>
      </SimpleGrid>
    </>
  );
}
