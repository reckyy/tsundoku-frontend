import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor, screen } from '@storybook/test';
import SearchForm from '@/components/search/SearchForm';
import toast from 'react-hot-toast';

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    onResults: () => {
      toast.success('検索が完了しました。');
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const AppearenceTest: Story = {
  args: {},
};

export const LabelAuthorTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: 'タイトル' });
    await userEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('著者')).toBeInTheDocument();
    });

    const authorButton = screen.getByRole('menuitem', { name: '著者' });
    await userEvent.click(authorButton);

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: '著者' }));
    });
  },
};

export const SearchTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText('search');
    await userEvent.type(searchInput, '本のタイトル');
    const searchIcon = canvas.getByLabelText('searchIcon');
    await userEvent.click(searchIcon);

    await waitFor(() => {
      expect(canvas.getByText('検索が完了しました。')).toBeInTheDocument();
    });
  },
};

export const ErrorTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText('search');
    await userEvent.type(searchInput, '本のタイトル');
    await userEvent.type(searchInput, '{enter}');

    await waitFor(() => {
      expect(canvas.getByText('本の検索に失敗しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.get(
          `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404`,
          () => {
            return HttpResponse.error();
          },
        ),
      ],
    },
  },
};
