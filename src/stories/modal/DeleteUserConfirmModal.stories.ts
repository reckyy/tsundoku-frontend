import type { Meta, StoryObj } from '@storybook/react';

import DeleteUserConfirmModal from '@/components/modal/DeleteUserConfirmModal';

const meta: Meta<typeof DeleteUserConfirmModal> = {
  component: DeleteUserConfirmModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    id: '1',
    close: () => {
      console.log('モーダルを閉じました。')
    },
  }
};

export default meta;
type Story = StoryObj<typeof DeleteUserConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};
