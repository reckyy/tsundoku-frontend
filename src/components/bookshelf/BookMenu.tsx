import {
  Menu,
  Group,
  ActionIcon,
  rem,
  MenuTarget,
  MenuItem,
  MenuDropdown,
} from '@mantine/core';
import { IconEdit, IconTrash, IconDots } from '@tabler/icons-react';
import Link from 'next/link';
import { BookMenuProps } from '@/types/book';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import DeleteBookConfirmModal from '../modal/DeleteBookConfirmModal';

export default function BookMenu({ bookId, id }: BookMenuProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group justify="center">
      <Modal
        opened={opened}
        radius="md"
        onClose={close}
        withCloseButton={false}
        centered
      >
        <DeleteBookConfirmModal
          params={{ bookId: bookId, id: id }}
          close={close}
        />
      </Modal>
      <Menu
        withArrow
        width={100}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <MenuTarget>
          <ActionIcon variant="default">
            <IconDots
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </MenuTarget>
        <MenuDropdown>
          <Link href={`/books/${bookId}/memos`}>
            <MenuItem
              leftSection={
                <IconEdit
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              メモ
            </MenuItem>
          </Link>
          <MenuItem
            color="red"
            onClick={open}
            leftSection={
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            削除
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </Group>
  );
}
