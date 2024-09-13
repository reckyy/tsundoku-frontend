import type { Meta, StoryObj } from '@storybook/react';

import TopPage from '@/components/top/TopPage';

const meta: Meta<typeof TopPage> = {
  component: TopPage,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopPage>;

export const AppearenceTest: Story = {
  args: {},
};
