import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor, screen } from '@storybook/test';
import UserMenu from '@/components/header/UserMenu';

const meta: Meta<typeof UserMenu> = {
  component: UserMenu,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    name: 'Tsundoku',
    id: '1',
    image:
      'https://lh3.google.com/u/2/ogw/AF2bZyjPZdkte2cG3oGzVf5-R-tTOWPRDqkWAaSt3H8vKx4HKg=s64-c-mo',
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const AppearenceTest: Story = {};

export const MenuTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const userMenuButton = canvas.getByText('Tsundoku');
    await userEvent.click(userMenuButton);
    await waitFor(() => {
      expect(screen.getByText('ログアウト')).toBeInTheDocument();
      expect(screen.getByText('公開ページ')).toBeInTheDocument();
      expect(screen.getByText('アカウントの削除')).toBeInTheDocument();
    });
    await userEvent.click(userMenuButton);
    await waitFor(() => {
      expect(screen.queryByText('ログアウト')).toBeFalsy();
      expect(screen.queryByText('公開ページ')).toBeFalsy();
      expect(screen.queryByText('アカウントの削除')).toBeFalsy();
    });
  },
};
