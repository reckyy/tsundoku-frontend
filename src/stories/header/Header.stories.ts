import type { Meta, StoryObj } from '@storybook/react';
import { auth } from '#auth';

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

export const AppearenceTest: Story = {
  async beforeEach() {
    auth.mockResolvedValue({
      user: {
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/test.png',
      },
      expires: '2024-06-30T00:00:00.000Z',
    });
  },
};
