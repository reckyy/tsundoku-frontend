import type { Meta, StoryObj } from '@storybook/react';

import NotFound from '@/components/error/NotFound';

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const AppearenceTest: Story = {
  args: {},
};
