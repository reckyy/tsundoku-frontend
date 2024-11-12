import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import DeleteBookConfirmModal from '@/components/modal/DeleteBookConfirmModal';
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

const meta: Meta<typeof DeleteBookConfirmModal> = {
  component: DeleteBookConfirmModal,
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
    close: () => {
      console.log('モーダルを閉じました。');
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteBookConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};

export const DeleteBookTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('本を削除しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/user_books/1`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
      ],
    },
  },
};

export const DeleteBookFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('本の削除に失敗しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/user_books/1`, () => {
          return new HttpResponse('failed', { status: 420 });
        }),
      ],
    },
  },
};
