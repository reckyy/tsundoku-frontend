import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor, screen } from '@storybook/test';
import MemoPageContent from '@/components/pageContent/MemoPageContent';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import * as nextNavigation from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(nextNavigation as any).useParams = () => ({
  bookId: '1',
});

const mockSession: Session = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'testuser@example.com',
    accessToken: 'hogehoge',
  },
  expires: '2025-12-31T23:59:59.999Z',
};

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const bookWithMemos = {
  id: 1,
  status: 'unread',
  book: {
    id: 1,
    title: '実践Next.js -- App Routerで進化するWebアプリ開発',
    author: '吉井 健文',
    coverImageUrl:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
  },
  headings: [
    {
      id: 1,
      number: 1,
      title: '第1章',
      memo: {
        id: 1,
        body: 'hogehoge',
      },
    },
    {
      id: 2,
      number: 2,
      title: '',
      memo: {
        id: 2,
        body: '',
      },
    },
  ],
};

const meta: Meta<typeof MemoPageContent> = {
  title: 'components/MemoPageComponent',
  component: MemoPageContent,
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
type Story = StoryObj<typeof MemoPageContent>;

export const AppearenceTest: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${RAILS_API_URL}/memos`, () => {
          return HttpResponse.json(bookWithMemos);
        }),
      ],
    },
  },
};

export const ChangeStatusTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByText('実践Next.js -- App Routerで進化するWebアプリ開発'),
      ).toBeInTheDocument();
    });
    const readingLabel = canvas.getByText('読んでる途中');
    await userEvent.click(readingLabel);
    await waitFor(() => {
      expect(
        screen.getByText('読書ステータスを更新しました！'),
      ).toBeInTheDocument();
    });
    const finishedLabel = screen.getByText('全部読んだ');
    await userEvent.click(finishedLabel);
    await waitFor(() => {
      expect(
        screen.getByText('読書ステータスを更新しました！'),
      ).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${RAILS_API_URL}/memos`, () => {
          return HttpResponse.json(bookWithMemos);
        }),
        http.patch(`${RAILS_API_URL}/user_books/1`, () => {
          return new HttpResponse();
        }),
      ],
    },
  },
};

export const AddHeadingTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByText('実践Next.js -- App Routerで進化するWebアプリ開発'),
      ).toBeInTheDocument();
    });
    const addHeadingButton = canvas.getByTestId('add-heading-button')
    await userEvent.click(addHeadingButton)
    await waitFor(() => {
      expect(canvas.getByText('章を追加しました。')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(canvas.getByText('3章')).toBeInTheDocument();
    });
  },

  parameters: {
    msw: {
      handlers: [
        http.get(`${RAILS_API_URL}/memos`, () => {
          return HttpResponse.json(bookWithMemos);
        }),
        http.post(`${RAILS_API_URL}/headings`, () => {
          return HttpResponse.json({
            id: 3,
            number: 3,
            title: '',
            memo: { id: 3, body: '' },
          });
        }),
      ],
    },
  },
};
export const AddMemoTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByText('実践Next.js -- App Routerで進化するWebアプリ開発'),
      ).toBeInTheDocument();
    });
    const saveButton = canvas.getByRole('button', { name: '保存' });
    const searchInput = canvas.getByLabelText('heading-title');
    await userEvent.type(searchInput, '追加したよ');
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(canvas.getByText('保存しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${RAILS_API_URL}/memos`, () => {
          return HttpResponse.json(bookWithMemos);
        }),
        http.patch(`${RAILS_API_URL}/headings/1`, () => {
          return new HttpResponse();
        }),
        http.patch(`${RAILS_API_URL}/headings/1`, () => {
          return new HttpResponse();
        }),
        http.post(`${RAILS_API_URL}/reading_logs`, () => {
          return new HttpResponse();
        }),
      ],
    },
  },
};
