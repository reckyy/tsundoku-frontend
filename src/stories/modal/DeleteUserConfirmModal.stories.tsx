import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { userEvent, within, expect, waitFor, fn } from '@storybook/test';
import DeleteUserConfirmModal from '@/components/modal/DeleteUserConfirmModal';
import { SessionProvider } from 'next-auth/react';
import { createMockSession } from '@/stories/utils/mockSession';

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const mockSession = createMockSession({
  id: '1',
  name: 'Test User',
  email: 'testuser@example.com',
  accessToken: 'hogehoge',
});

const meta: Meta<typeof DeleteUserConfirmModal> = {
  component: DeleteUserConfirmModal,
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
type Story = StoryObj<typeof DeleteUserConfirmModal>;

export const AppearenceTest: Story = {
  args: {},
};

const signOutSpy = fn();

export const DeleteUserTest: Story = {
  play: async ({ canvasElement }) => {
    signOutSpy.mockClear();
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(signOutSpy).toHaveBeenCalled();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/users/1`, () => {
          return new HttpResponse(null, { status: 204 });
        }),
        http.get('/api/auth/csrf', () => {
          return HttpResponse.json({ csrfToken: 'fake-csrf-token' });
        }),
        http.post('/api/auth/signout', async ({ request }) => {
          const body = await request.text();
          signOutSpy(body);
          await delay('infinite');
          return HttpResponse.json({ url: '/thanks' });
        }),
      ],
    },
  },
};

export const DeleteUserFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('退会に失敗しました。')).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/users/1`, () => {
          return new HttpResponse('failed', { status: 420 });
        }),
      ],
    },
  },
};
