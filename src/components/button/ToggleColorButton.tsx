'use client';

import { useMantineColorScheme, ActionIcon, rem } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ToggleColorButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      size={34}
      variant="default"
      aria-label="ActionIcon to switch color"
      onClick={toggleColorScheme}
    >
      {colorScheme === 'light' ? (
        <IconMoon style={{ width: rem(20), height: rem(20) }} />
      ) : (
        <IconSun style={{ width: rem(20), height: rem(20) }} />
      )}
    </ActionIcon>
  );
}
