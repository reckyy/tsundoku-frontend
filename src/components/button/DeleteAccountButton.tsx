'use client';

import { Button, Modal } from '@mantine/core';
import DeleteUserConfirmModal from '../modal/DeleteUserConfirmModal';
import { useDisclosure } from '@mantine/hooks';
import { SessionProvider } from 'next-auth/react';

export default function DeleteAccountButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <SessionProvider>
      <Modal
        opened={opened}
        radius="md"
        onClose={close}
        withCloseButton={false}
        centered
      >
        <DeleteUserConfirmModal close={close} />
      </Modal>
      <Button variant="light" radius="lg" color="red" onClick={open}>
        アカウントを削除
      </Button>
    </SessionProvider>
  );
}
