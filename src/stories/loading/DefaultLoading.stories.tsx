import type { Meta, StoryObj } from '@storybook/react';

import DefaultLoading from '@/components/loading/DefaultLoading';

const meta: Meta<typeof DefaultLoading> = {
  component: DefaultLoading,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultLoading>;

export const AppearenceTest: Story = {
  args: {},
};
