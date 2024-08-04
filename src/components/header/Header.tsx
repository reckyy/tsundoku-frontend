import { auth } from '#auth';
import { Group, Text, Container } from '@mantine/core';
import Image from 'next/image';
import UserMenu from './UserMenu';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <Container size="md" p="md">
      <Group h="100%" px="md">
        <Group justify="space-between" style={{ flex: 1 }}>
          <Link href={'/'}>
            <Group gap="xs">
              <Image src="/Tsundoku.png" alt="ロゴ" width={28} height={28} />
              <Text fw={700} size="xl">
                Tsundoku
              </Text>
            </Group>
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
    </Container>
  );
}
