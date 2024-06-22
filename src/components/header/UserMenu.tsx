'use client';

import cx from 'clsx';
import { useState } from 'react';
import { Group, Menu, rem, UnstyledButton, Text, Avatar } from '@mantine/core';
import classes from './HeaderTabs.module.css';
import {
  IconLogout,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconChevronDown,
} from '@tabler/icons-react';
import { handleSignOut } from '../../feature/SignOut';

type UserInfo = {
  name: string;
  image: string;
};

const UserMenu = ({ name, image }: UserInfo) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

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
        <Menu.Item
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>
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
          leftSection={
            <IconPlayerPause
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Pause subscription
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
