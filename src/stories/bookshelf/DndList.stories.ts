import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import {
  fireEvent,
  within,
  expect,
  waitFor,
  screen,
  userEvent,
} from '@storybook/test'; // userEventではdraganddropができないため、fireEventを採用している。
import DndList from '@/components/bookshelf/DndList';

const meta: Meta<typeof DndList> = {
  component: DndList,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    bookItems: [
      {
        id: 1,
        title: '実践Next.js -- App Routerで進化するWebアプリ開発',
        author: '吉井 健文',
        coverImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
      },
      {
        id: 2,
        title:
          'プロを目指す人のためのRuby入門［改訂2版］　言語仕様からテスト駆動開発・デバッグ技法まで',
        author: '伊藤 淳一',
        coverImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/4373/9784297124373_1_5.jpg?_ex=200x200',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DndList>;

export const AppearenceTest: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(
          `${process.env.NEXT_PUBLIC_RAILS_API_URL}/user_books/move_position`,
          () => {
            return new HttpResponse();
          },
        ),
      ],
    },
  },
};

export const DndTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sourceBook = canvas.getByText(
      '実践Next.js -- App Routerで進化するWebアプリ開発',
    );
    const targetBook = canvas.getByText(/プロを目指す人のためのRuby入門/i);

    fireEvent.dragStart(sourceBook);
    fireEvent.dragOver(targetBook);
    fireEvent.drop(targetBook);
    fireEvent.dragEnd(sourceBook);

    await waitFor(() => {
      expect(
        canvas.getByText('本の並び替えに成功しました！'),
      ).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post(
          `${process.env.NEXT_PUBLIC_RAILS_API_URL}/user_books/move_position`,
          () => {
            return new HttpResponse();
          },
        ),
      ],
    },
  },
};

export const DndFailedTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sourceBook = canvas.getByText(
      '実践Next.js -- App Routerで進化するWebアプリ開発',
    );
    const targetBook = canvas.getByText(/プロを目指す人のためのRuby入門/i);

    fireEvent.dragStart(sourceBook);
    fireEvent.dragOver(targetBook);
    fireEvent.drop(targetBook);
    fireEvent.dragEnd(sourceBook);

    await waitFor(() => {
      expect(
        canvas.getByText('本の並び替えに失敗しました。'),
      ).toBeInTheDocument();
    });
  },
  parameters: {
    msw: {
      handlers: [
        http.post(
          `${process.env.NEXT_PUBLIC_RAILS_API_URL}/user_books/move_position`,
          () => {
            return new HttpResponse('failed', { status: 420 });
          },
        ),
      ],
    },
  },
};

export const ShowModalTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteBookButtons = canvas.getAllByLabelText('deleteBook');
    const deleteBookButton = deleteBookButtons[0];
    userEvent.click(deleteBookButton);
    await waitFor(() => {
      expect(screen.getByText('削除しますか？')).toBeInTheDocument();
    });
  },
};
