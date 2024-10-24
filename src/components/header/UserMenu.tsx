'use client';

import cx from 'clsx';
import { useState } from 'react';
import { Group, Menu, rem, UnstyledButton, Text, Avatar } from '@mantine/core';
import classes from './HeaderTabs.module.css';
import {
  IconLogout,
  IconTrash,
  IconChevronDown,
  IconLink,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useClipboard } from '@mantine/hooks';

type UserMenuProps = {
  name: string;
  id: string;
  image: string;
};

export default function UserMenu({ name, id, image }: UserMenuProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const clipboard = useClipboard();
  const rootUrl = process.env.NEXT_PUBLIC_NEXT_URL;

  const handleCopyUrl = () => {
    const url = `${rootUrl}/users/${id}`;
    clipboard.copy(url);

    if (!clipboard.error && id !== undefined) {
      toast.success('URLのコピーに成功しました');
    } else {
      toast.error('URLのコピーに失敗しました');
    }
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
          aria-label="userMenu"
        >
          <Group gap={7}>
            <Avatar src={image} alt={name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {name}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Menu</Menu.Label>
        <Menu.Item
          onClick={() => signOut()}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          ログアウト
        </Menu.Item>

        <Menu.Item
          color="blue"
          leftSection={
            <IconLink
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={handleCopyUrl}
        >
          公開ページ
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Link href="confirm_deletion">
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            アカウントの削除
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
