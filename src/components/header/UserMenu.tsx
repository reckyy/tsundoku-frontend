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
} from '@tabler/icons-react';
import { handleSignOut } from '../../feature/SignOut';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserInfo } from '@/types/index';
import Link from 'next/link';
import { useClipboard } from '@mantine/hooks';

export default function UserMenu({ name, image, id }: UserInfo) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const clipboard = useClipboard();

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/users/${id}`);
      if (res.status === 204) {
        handleSignOut();
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleCopyUrl = () => {
    const url = `http://localhost:3000/users/${id}`;
    clipboard.copy(url);

    if (!clipboard.error) {
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
            color="green"
            leftSection={
              <IconBook
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            本の追加
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
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={handleDeleteUser}
        >
          アカウントの削除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
