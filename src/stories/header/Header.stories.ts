import type { Meta, StoryObj } from '@storybook/react';
import { auth } from '#auth';
import dayjs from 'dayjs';

import { Header } from '@/components/header/Header';

const expiresDate = dayjs().subtract(1, 'm');

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
        handleName: 'Tsundoku',
        email: 'tsundoku@example.com',
        coverImageUrl: 'https://example.com/test.png',
      },
      expires: expiresDate,
    });
  },
};
