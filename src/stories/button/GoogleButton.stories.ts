import type { Meta, StoryObj } from '@storybook/react';

import GoogleButton from '@/components/button/GoogleButton';

const meta: Meta<typeof GoogleButton> = {
  component: GoogleButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof GoogleButton>;

export const AppearenceTest: Story = {
  args: {},
};
