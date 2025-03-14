'use client';

import {
  Container,
  Text,
  Group,
  Button,
  Stack,
  Code,
  Space,
  Title,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import toast from 'react-hot-toast';
import Calendar from '@/components/calendar/Calendar';
import BookItems from '@/components/bookshelf/BookItems';
import { UserBook, Log, Filter } from '@/types/index';

type UserPageContentProps = {
  userData: {
    name: string;
    user_books: Record<Filter, UserBook[]>;
    logs: Record<string, Log[]>;
  };
  id: string;
  isCurrentUser: boolean;
};

export default function UserPageContent({
  userData,
  id,
  isCurrentUser,
}: UserPageContentProps) {
  const clipboard = useClipboard();
  const userPageUrl = `${process.env.NEXT_PUBLIC_NEXT_URL}/users/${id}`;

  const handleCopyUrl = () => {
    clipboard.copy(userPageUrl);

    if (!clipboard.error) {
      toast.success('URLのコピーに成功しました');
    } else {
      toast.error('URLのコピーに失敗しました');
    }
  };

  return (
    <>
      {isCurrentUser && (
        <Container bg={'var(--mantine-color-blue-light)'} h={150} mt="md">
          <Stack pt="md" align="center" justify="center">
            <Text>このページは他人から見たあなたのページです。</Text>
            <Text>このページは自分以外の人も見ることができます。</Text>
            <Group>
              <Code block color="gray.3">
                {userPageUrl}
              </Code>
              <Button onClick={handleCopyUrl}>コピー</Button>
            </Group>
          </Stack>
        </Container>
      )}
      <Container my="md">
        <Title size={'h2'} ta={'center'}>
          <Text inherit>{userData.name}さんの読書記録</Text>
        </Title>
        <Space h={20} />
        <Calendar readingLogs={userData.logs} />
        <Space h="20" />
        <Title size={'h2'} ta={'center'}>
          <Text inherit>{userData.name}さんの本棚</Text>
        </Title>
        <BookItems bookItems={userData.user_books} isPublic={true} />
        <Space h={60} />
      </Container>
    </>
  );
}
