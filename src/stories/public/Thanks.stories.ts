import type { Meta, StoryObj } from '@storybook/react';

import Thanks from '@/components/public/Thanks';


const meta: Meta<typeof Thanks> = {
  component: Thanks,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Thanks>;

export const AppearenceTest: Story = {
  args: {},
};
