import type { Meta, StoryObj } from '@storybook/react';

import Terms from '@/components/footer/Terms';

const meta: Meta<typeof Terms> = {
  component: Terms,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Terms>;

export const AppearenceTest: Story = {
  args: {},
};
