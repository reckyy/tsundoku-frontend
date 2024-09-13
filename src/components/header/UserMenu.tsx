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
  IconBook,
  IconSearch,
} from '@tabler/icons-react';
import { handleSignOut } from '../../feature/SignOut';
import toast from 'react-hot-toast';
import { UserInfo } from '@/types/index';
import Link from 'next/link';
import { useClipboard } from '@mantine/hooks';

export default function UserMenu({ handleName, image }: UserInfo) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const clipboard = useClipboard();
  const baseUrl: string = process.env.NEXT_PUBLIC_NEXT_URL ?? '';

  const handleCopyUrl = () => {
    const url = `${baseUrl}/users/${handleName}`;
    clipboard.copy(url);

    if (!clipboard.error && handleName !== undefined) {
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
            <Avatar src={image} alt={handleName} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {handleName}
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
        <form action={handleSignOut}>
          <Menu.Item
            leftSection={
              <IconLogout
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            type="submit"
          >
            ログアウト
          </Menu.Item>
        </form>

        <Link href={'/search_books'}>
          <Menu.Item
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            本の追加
          </Menu.Item>
        </Link>
        <Link href={`/bookshelf/edit`}>
          <Menu.Item
            leftSection={
              <IconBook
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            本棚の編集
          </Menu.Item>
        </Link>
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
