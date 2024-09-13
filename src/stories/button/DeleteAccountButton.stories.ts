import type { Meta, StoryObj } from '@storybook/react';

import DeleteAccountButton from '@/components/button/DeleteAccountButton';

const meta: Meta<typeof DeleteAccountButton> = {
  component: DeleteAccountButton,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    id: '1',
  },
};

export default meta;
type Story = StoryObj<typeof DeleteAccountButton>;

export const AppearenceTest: Story = {
  args: {},
};
