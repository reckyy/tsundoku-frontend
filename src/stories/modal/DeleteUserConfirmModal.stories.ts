import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import DeleteUserConfirmModal from '@/components/modal/DeleteUserConfirmModal';

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const meta: Meta<typeof DeleteUserConfirmModal> = {
  component: DeleteUserConfirmModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    id: '1',
    token: 'hogehoge',
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

export const DeleteBookTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '削除' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        canvas.getByText('アカウントを削除しました。'),
      ).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.delete(`${RAILS_API_URL}/users/1`, () => {
          return new HttpResponse(null, { status: 204 });
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
