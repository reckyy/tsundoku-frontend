'use client';

import {
  Container,
  Grid,
  GridCol,
  TextInput,
  Flex,
  Button,
  Title,
  Text,
  Space,
} from '@mantine/core';
import { useState } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}

function PageContent() {
  const { data: session, update } = useSession();
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (value.includes('User')) {
      toast.error('Userが含まれています。');
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:3001/api/users/${session?.user.id}`,
        {
          user_id: session?.user.id,
          handle_name: value,
        },
      );
      if (res.status === 200) {
        await update({ user: { handleName: value } });
        router.refresh();
        toast.success('設定しました！');
      } else {
        return false;
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data.error === 'Handle name has already been taken'
      ) {
        toast.error(`${value}はすでに使われています。`);
        return false;
      } else {
        toast.error('更新に失敗しました。');
        return false;
      }
    }
  };

  return (
    <Container my="md">
      <Title size={'h2'} ta="center">
        ハンドルネーム登録
      </Title>
      <Space h={20} />
      <Text ta="center">ハンドルネームを決めましょう！</Text>
      <Text ta="center">
        例 : https://tsundoku.com/
        <Text span fw={700}>
          dokusyo
        </Text>
      </Text>
      <Text ta="center">
        ※サービスの都合上、{' '}
        <Text span fw={700}>
          User
        </Text>
        という単語は含まないようにお願いします。
      </Text>
      <Space h={20} />
      <Grid>
        <GridCol span={6} offset={3}>
          <TextInput
            size="md"
            label="ハンドルネーム"
            placeholder={session?.user?.handleName}
            value={value}
            {...(value.includes('User') && { error: 'Userが含まれています。' })}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </GridCol>
        <GridCol span={6} offset={3}>
          <Flex justify="flex-end" align="center" direction="row">
            <Button onClick={handleSubmit}>登録</Button>
          </Flex>
        </GridCol>
      </Grid>
    </Container>
  );
}
