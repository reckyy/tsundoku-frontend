import type { Meta, StoryObj } from '@storybook/react';

import DeleteBookConfirmModal from '@/components/modal/DeleteBookConfirmModal';

const meta: Meta<typeof DeleteBookConfirmModal> = {
  component: DeleteBookConfirmModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    params: {
      bookId: 1,
      userId: '1',
    },
    close: () => {
      console.log('モーダルを閉じました。')
    },
  }
};

export default meta;
type Story = StoryObj<typeof DeleteBookConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};
