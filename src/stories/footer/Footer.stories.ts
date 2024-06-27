import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from '@/components/footer/Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const AppearenceTest: Story = {};
