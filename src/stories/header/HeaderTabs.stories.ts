import type { Meta, StoryObj } from '@storybook/react';

import { HeaderTabs } from '@/components/header/HeaderTabs';

const meta: Meta<typeof HeaderTabs> = {
  component: HeaderTabs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HeaderTabs>;

export const AppearenceTest: Story = {
  args: {},
};
