import type { Meta, StoryObj } from '@storybook/react';

import AddBookConfirmButton from '@/components/button/AddBookConfirmButton';

const meta: Meta<typeof AddBookConfirmButton> = {
  component: AddBookConfirmButton,
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
type Story = StoryObj<typeof AddBookConfirmButton>;

export const AppearenceTest: Story = {
  args: {},
};
