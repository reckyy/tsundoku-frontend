import type { Meta, StoryObj } from '@storybook/react';

import SignInButton from '@/components/button/SignInButton';

const meta: Meta<typeof SignInButton> = {
  component: SignInButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SignInButton>;

export const AppearenceTest: Story = {
  args: {},
};
