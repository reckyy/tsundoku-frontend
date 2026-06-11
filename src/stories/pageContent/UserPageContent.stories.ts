import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import dayjs from 'dayjs';
import UserPageContent from '@/components/pageContent/UserPageContent';

const currentYear = dayjs().year();
const today = dayjs().format('YYYY-MM-DD');

const userData = {
  name: 'Test User',
  user_books: {
    unread_books: [
      {
        id: 1,
        status: 'unread',
        book: {
          id: 1,
          title: '実践Next.js -- App Routerで進化するWebアプリ開発',
          author: '吉井 健文',
          coverImageUrl:
            'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
        },
      },
    ],
    reading_books: [
      {
        id: 2,
        status: 'reading',
        book: {
          id: 2,
          title:
            'プロを目指す人のためのRuby入門［改訂2版］　言語仕様からテスト駆動開発・デバッグ技法まで',
          author: '伊藤 淳一',
          coverImageUrl:
            'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/4373/9784297124373_1_5.jpg?_ex=200x200',
        },
      },
    ],
    finished_books: [],
  },
  logs: {
    [currentYear]: [
      {
        date: today,
        count: 2,
      },
    ],
  },
};

const meta: Meta<typeof UserPageContent> = {
  component: UserPageContent,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    userData,
    id: '1',
    isCurrentUser: false,
  },
};

export default meta;
type Story = StoryObj<typeof UserPageContent>;

export const AppearenceTest: Story = {
  args: {},
};

export const VisitorViewTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Test Userさんの読書記録'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Test Userさんの本棚')).toBeInTheDocument();
    await expect(
      canvas.queryByText('このページは他人から見たあなたのページです。'),
    ).toBeFalsy();
  },
};

export const CurrentUserViewTest: Story = {
  args: {
    isCurrentUser: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('このページは他人から見たあなたのページです。'),
    ).toBeInTheDocument();
  },
};

export const CopyUrlTest: Story = {
  args: {
    isCurrentUser: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button', { name: 'コピー' });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(canvas.getByText('URLのコピーに成功しました')).toBeInTheDocument();
    });
  },
};
