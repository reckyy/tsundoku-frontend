import type { Meta, StoryObj } from '@storybook/react';

import UserMenuFeature from '@/components/public/UserMenuFeature';


const meta: Meta<typeof UserMenuFeature> = {
  component: UserMenuFeature,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserMenuFeature>;

export const AppearenceTest: Story = {
  args: {},
};
