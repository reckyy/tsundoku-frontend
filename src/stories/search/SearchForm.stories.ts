import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor, screen } from '@storybook/test';
import SearchForm from '@/components/search/SearchForm';
import toast from 'react-hot-toast';

const mockBooksResponse = {
  Items: [
    {
      Item: {
        title: '本のタイトル',
        author: '著者名',
        largeImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
      },
    },
  ],
};

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
  parameters: {
    msw: {
      handlers: [
        http.get('/api/books/search', () => {
          return HttpResponse.json(mockBooksResponse);
        }),
      ],
    },
  },
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
        http.get(`/api/books/search`, () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};
