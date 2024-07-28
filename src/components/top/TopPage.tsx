import SignInButton from '../button/SignInButton';
import HeroBullets from '@/components/public/HeroBullets';
import { Center } from '@mantine/core';

export default function TopPage() {
  return (
    <>
      <HeroBullets />
      <Center>
        <SignInButton />
      </Center>
    </>
  );
}
