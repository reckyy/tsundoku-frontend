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
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const AppearenceTest: Story = {
  args: {
    name: 'Tsundoku',
    id: '1',
    image:
      'https://lh3.google.com/u/2/ogw/AF2bZyjPZdkte2cG3oGzVf5-R-tTOWPRDqkWAaSt3H8vKx4HKg=s64-c-mo',
  },
};

export const CopyUrlTest: Story = {
  args: {
    name: 'Tsundoku',
    id: '1',
    image:
      'https://lh3.google.com/u/2/ogw/AF2bZyjPZdkte2cG3oGzVf5-R-tTOWPRDqkWAaSt3H8vKx4HKg=s64-c-mo',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByLabelText('userMenu');
    await userEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    const copyUrlButton = screen.getByRole('menuitem', { name: '公開ページ' });
    await userEvent.click(copyUrlButton);

    await waitFor(() => {
      expect(canvas.getByText('URLのコピーに成功しました'));
    });
  },
};

export const CopyUrlFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByLabelText('userMenu');
    await userEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    const copyUrlButton = screen.getByRole('menuitem', { name: '公開ページ' });
    await userEvent.click(copyUrlButton);

    await waitFor(() => {
      expect(canvas.getByText('URLのコピーに失敗しました'));
    });
  },
};
