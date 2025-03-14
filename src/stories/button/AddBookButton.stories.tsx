import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import AddBookButton from '@/components/button/AddBookButton';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const mockSession: Session = {
  user: {
    name: 'Test User',
    email: 'testuser@example.com',
    accessToken: 'hogehoge',
  },
  expires: '2025-12-31T23:59:59.999Z',
};

const meta: Meta<typeof AddBookButton> = {
  component: AddBookButton,
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    book: {
      id: 1,
      title: '実践Next.js -- App Routerで進化するWebアプリ開発',
      author: '吉井 健文',
      coverImageUrl:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddBookButton>;

export const AppearenceTest: Story = {};

export const AddBookTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '本棚に追加' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('本を保存しました！')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post(`${RAILS_API_URL}/books`, () => {
          return new HttpResponse();
        }),
        http.post(`${RAILS_API_URL}/user_books`, () => {
          return new HttpResponse();
        }),
      ],
    },
  },
};
