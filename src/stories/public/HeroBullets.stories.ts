import type { Meta, StoryObj } from '@storybook/react';

import HeroBullets from '@/components/public/HeroBullets';

const meta: Meta<typeof HeroBullets> = {
  component: HeroBullets,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroBullets>;

export const AppearenceTest: Story = {
  args: {},
};
