import type { Meta, StoryObj } from '@storybook/react';

import MemoLoading from '@/components/loading/MemoLoading';

const meta: Meta<typeof MemoLoading> = {
  component: MemoLoading,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemoLoading>;

export const AppearenceTest: Story = {
  args: {},
};
