import type { Meta, StoryObj } from '@storybook/react';

import GoogleIcon from '@/components/icon/GoogleIcon';

const meta: Meta<typeof GoogleIcon> = {
  component: GoogleIcon,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleIcon>;

export const AppearenceTest: Story = {
  args: {},
};
