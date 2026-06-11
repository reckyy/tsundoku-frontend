import type { Meta, StoryObj } from '@storybook/react';

import Privacy from '@/components/footer/Privacy';

const meta: Meta<typeof Privacy> = {
  component: Privacy,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Privacy>;

export const AppearenceTest: Story = {
  args: {},
};
