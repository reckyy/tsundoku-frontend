import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/header/Header';

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const AppearenceTest: Story = {};
