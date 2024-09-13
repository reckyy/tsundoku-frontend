import type { Meta, StoryObj } from '@storybook/react';

import Welcome from '@/components/top/Welcome';

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const AppearenceTest: Story = {
  args: {},
};
