import SignInButton from '../button/SignInButton';
import HeroBullets from '@/components/public/HeroBullets';
import { Center, Text, Space, Anchor } from '@mantine/core';

export default function TopPage() {
  return (
    <>
      <HeroBullets />
      <Space h={10} />
      <Center>
        <SignInButton />
      </Center>
      <Space h={20} />
      <Center>
        <Text size="sm" c="dimmed">
          ログインすることで、
          <Anchor href="/terms" underline="hover">
            利用規約
          </Anchor>
          と
          <Anchor href="privacy" underline="hover">
            プライバシーポリシー
          </Anchor>
          に同意したことになります。
        </Text>
      </Center>
    </>
  );
}
