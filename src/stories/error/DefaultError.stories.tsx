import type { Meta, StoryObj } from '@storybook/react';

import DefaultError from '@/components/error/DefaultError';

const meta: Meta<typeof DefaultError> = {
  component: DefaultError,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    reset: () => {
      console.log('resetが呼ばれた');
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultError>;

export const AppearenceTest: Story = {
  args: {},
};
