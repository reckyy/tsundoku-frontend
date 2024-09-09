import type { Meta, StoryObj } from '@storybook/react';

import ServiceFeature from '@/components/public/ServiceFeature';


const meta: Meta<typeof ServiceFeature> = {
  component: ServiceFeature,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceFeature>;

export const AppearenceTest: Story = {
  args: {},
};
