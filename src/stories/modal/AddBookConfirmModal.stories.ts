import type { Meta, StoryObj } from '@storybook/react';
import AddBookConfirmModal from '@/components/modal/AddBookConfirmModal';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';

const RAILS_API_URL = process.env.STORYBOOK_NEXT_PUBLIC_RAILS_API_URL;

const meta: Meta<typeof AddBookConfirmModal> = {
  component: AddBookConfirmModal,
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
type Story = StoryObj<typeof AddBookConfirmModal>;

export const AppearenceTest: Story = {};

export const EmptyValueTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: '追加' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        canvas.getByText('章の数を入力してください。'),
      ).toBeInTheDocument();
    });
  },
};

export const AddBookTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Input = await canvas.getByLabelText('headingNumber');
    await userEvent.type(Input, '1');
    const button = await canvas.getByRole('button', { name: '追加' });
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
      ],
    },
  },
};

export const AddBookFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Input = await canvas.getByLabelText('headingNumber');
    await userEvent.type(Input, '1');
    const button = await canvas.getByRole('button', { name: '追加' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(canvas.getByText('本の保存に失敗しました。')).toBeInTheDocument();
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
