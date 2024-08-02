'use client';

import { Button, Modal } from '@mantine/core';
import { UserParams } from '@/types/index';
import DeleteUserConfirmModal from '../modal/DeleteUserConfirmModal';
import { useDisclosure } from '@mantine/hooks';

export default function DeleteAccountButton({ uid }: UserParams) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        radius="md"
        onClose={close}
        withCloseButton={false}
        centered
      >
        <DeleteUserConfirmModal uid={uid} close={close} />
      </Modal>
      <Button variant="light" radius="lg" color="red" onClick={open}>
        アカウントを削除
      </Button>
    </>
  );
}
