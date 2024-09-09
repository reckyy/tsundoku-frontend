import type { Meta, StoryObj } from '@storybook/react';

import AddBookConfirmModal from '@/components/modal/AddBookConfirmModal';

const meta: Meta<typeof AddBookConfirmModal> = {
  component: AddBookConfirmModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    book: {
      id: 1,
      title: 'test_title',
      author: 'test_author',
      coverImageUrl: 'test_url',
    }
  }
};

export default meta;
type Story = StoryObj<typeof AddBookConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};
