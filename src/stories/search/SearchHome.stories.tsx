import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import SearchHome from '@/components/search/SearchHome';
import { SessionProvider } from 'next-auth/react';
import { createMockSession } from '@/stories/utils/mockSession';

const mockBooksResponse = {
  Items: [
    {
      Item: {
        title: 'プロを目指す人のためのRuby入門',
        author: '伊藤淳一',
        largeImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
      },
    },
  ],
};

const mockSession = createMockSession({
  id: '1',
  name: 'Test User',
  email: 'testuser@example.com',
  accessToken: 'hogehoge',
});

const meta: Meta<typeof SearchHome> = {
  component: SearchHome,
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchHome>;

export const AppearenceTest: Story = {
  args: {},
};

export const SearchBookTest: Story = {
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
    await userEvent.type(searchInput, 'プロを目指す人のためのRuby入門');
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(
        canvas.getByText(/プロを目指す人のためのRuby入門/i),
      ).toBeInTheDocument();
    });
  },
};
