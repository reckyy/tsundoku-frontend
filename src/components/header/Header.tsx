import { auth } from '#auth';
import { Group } from '@mantine/core';
import Image from 'next/image';
import UserMenu from './UserMenu';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <Group h="100%" px="md">
      <Group justify="space-between" style={{ flex: 1 }}>
        <Link href={'/'}>
          <Image src="Mantine logo.svg" alt="仮のロゴ" width={28} height={28} />
        </Link>
        <Group ml="xl" gap={0}>
          {session?.user && (
            <UserMenu
              name={session.user.name!}
              image={session.user.image!}
              id={session.user.id!}
            />
          )}
        </Group>
      </Group>
    </Group>
  );
}
