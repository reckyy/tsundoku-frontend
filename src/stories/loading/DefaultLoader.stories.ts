import type { Meta, StoryObj } from '@storybook/react';

import DefaultLoader from '@/components/loading/DefaultLoader';


const meta: Meta<typeof DefaultLoader> = {
  component: DefaultLoader,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultLoader>;

export const AppearenceTest: Story = {
  args: {},
};
