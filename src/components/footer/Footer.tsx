import {
  IconBrandTwitter,
  IconBrandGithub,
  IconArticle,
  IconQuestionMark,
} from '@tabler/icons-react';
import {
  Group,
  ActionIcon,
  UnstyledButton,
  rem,
  Text,
  Container,
} from '@mantine/core';
import Image from 'next/image';
import classes from './Footer.module.css';
import Link from 'next/link';

export function Footer() {
  return (
    <Container size="md">
      <Group h="100%" px="md">
        <Group justify="center" style={{ flex: 1 }}>
          <Link href={'/'}>
            <Group gap="xs">
              <Image src="/Tsundoku.png" alt="ロゴ" width={28} height={28} />
              <Text fw={700} size="xl">
                Tsundoku
              </Text>
            </Group>
          </Link>
          <Group ml="xl" gap={0}>
            <Link href={'/terms'}>
              <UnstyledButton className={classes.control}>
                利用規約
              </UnstyledButton>
            </Link>
            <Link href={'/privacy'}>
              <UnstyledButton className={classes.control}>
                プライバシーポリシー
              </UnstyledButton>
            </Link>
          </Group>
          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <Link href={'/about'}>
              <ActionIcon size="lg" variant="default" radius="xl">
                <IconQuestionMark
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Link>
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
    </Container>
  );
}
