import type { Meta, StoryObj } from '@storybook/react';

import TopLoading from '@/components/loading/TopLoading';

const meta: Meta<typeof TopLoading> = {
  component: TopLoading,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopLoading>;

export const AppearenceTest: Story = {
  args: {},
};
