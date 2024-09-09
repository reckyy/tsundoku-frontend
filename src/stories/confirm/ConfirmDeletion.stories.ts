import type { Meta, StoryObj } from '@storybook/react';

import ConfirmDeletion from '@/components/confirm/ConfirmDeletion';

const meta: Meta<typeof ConfirmDeletion> = {
  component: ConfirmDeletion,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDeletion>;

export const AppearenceTest: Story = {
  args: {},
};
