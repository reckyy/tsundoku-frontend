import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import DeleteBookConfirmModal from '@/components/modal/DeleteBookConfirmModal';
import { API_CONSTS } from '@/consts/apiConsts';

const { RAILS_API_URL } = API_CONSTS;

const meta: Meta<typeof DeleteBookConfirmModal> = {
  component: DeleteBookConfirmModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    params: {
      bookId: 1,
      userId: '1',
    },
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
