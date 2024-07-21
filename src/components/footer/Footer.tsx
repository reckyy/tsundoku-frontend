import {
  IconBrandTwitter,
  IconBrandGithub,
  IconArticle,
} from '@tabler/icons-react';
import { Group, ActionIcon, UnstyledButton, rem } from '@mantine/core';
import Image from 'next/image';
import classes from './Footer.module.css';
import Link from 'next/link';

export function Footer() {
  return (
    <Group h="100%" px="md">
      <Group justify="space-between" style={{ flex: 1 }}>
        <Link href={'/'}>
          <Image src="Mantine logo.svg" alt="仮のロゴ" width={28} height={28} />
        </Link>
        <Group ml="xl" gap={0}>
          <Link href={'/terms'}>
            <UnstyledButton className={classes.control}>Terms</UnstyledButton>
          </Link>
          <Link href={'/privacy'}>
            <UnstyledButton className={classes.control}>
              Privacy policy
            </UnstyledButton>
          </Link>
        </Group>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconArticle
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Group>
  );
}
