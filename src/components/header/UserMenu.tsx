'use client';

import cx from 'clsx';
import { useState } from 'react';
import { Group, Menu, rem, UnstyledButton, Text, Avatar } from '@mantine/core';
import classes from './HeaderTabs.module.css';
import { IconLogout, IconTrash, IconChevronDown } from '@tabler/icons-react';
import { handleSignOut } from '../../feature/SignOut';
import axios from 'axios';
import { useSession, SessionProvider } from 'next-auth/react';

type UserInfo = {
  name: string;
  image: string;
};

export default function UserMenu({ name, image }: UserInfo) {
  return (
    <SessionProvider>
      <UserMenuContent name={name} image={image} />
    </SessionProvider>
  );
}

const UserMenuContent = ({ name, image }: UserInfo) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data: session } = useSession();

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/users/${session?.user?.id}`,
      );
      if (res.status === 204) {
        handleSignOut();
      } else {
        return false;
      }
    } catch (error) {
      return false;
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
        <Menu.Label>Settings</Menu.Label>
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
            Logout
          </Menu.Item>
        </form>

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
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
