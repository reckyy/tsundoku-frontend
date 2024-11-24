import { Anchor, Group, ActionIcon, rem, Text, Container } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandGithub,
  IconArticle,
  IconQuestionMark,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

import classes from './Footer.module.css';

const links = [
  { link: '/terms', label: '利用規約' },
  { link: '/privacy', label: 'プライバシーポリシー' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} lh={1} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <Container size="md">
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Group gap="xs">
            <Image src="/Tsundoku.png" alt="ロゴ" width={28} height={28} />
            <Text fw={700} size="xl">
              Tsundoku
            </Text>
          </Group>

          <Group className={classes.links}>{items}</Group>

          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <Link href={'/about'}>
              <ActionIcon size="lg" variant="default" radius="xl">
                <IconQuestionMark
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Link>
            <Anchor
              href="https://x.com/recky4711692"
              target="_blank"
              underline="never"
            >
              <ActionIcon size="lg" variant="default" radius="xl">
                <IconBrandTwitter
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://github.com/reckyy/tsundoku"
              target="_blank"
              underline="never"
            >
              <ActionIcon size="lg" variant="default" radius="xl">
                <IconBrandGithub
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://zenn.dev/recky/articles/tsundoku_release_notes"
              target="_blank"
              underline="never"
            >
              <ActionIcon size="lg" variant="default" radius="xl">
                <IconArticle
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Anchor>
          </Group>
        </div>
      </div>
    </Container>
  );
}
