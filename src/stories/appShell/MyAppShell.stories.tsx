import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import dayjs from 'dayjs';
import MyAppShell from '@/components/appShell/MyAppShell';
import BookItems from '@/components/bookshelf/BookItems';
import Calendar from '@/components/calendar/Calendar';

const mockBooks = [
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
  {
    id: 3,
    title:
      'プロを目指す人のためのTypeScript入門　安全なコードの書き方から高度な型の使い方まで',
    author: '鈴木 僚太',
    coverImageUrl:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7473/9784297127473_1_3.jpg?_ex=200x200',
  },
];

const previousDay = dayjs().subtract(1, 'd').format('YYYY-MM-DD');
const today = dayjs().format('YYYY-MM-DD');

const readingLogs = [
  {
    date: previousDay,
    count: 1,
  },
  {
    date: today,
    count: 5,
  },
];

const meta: Meta<typeof MyAppShell> = {
  component: MyAppShell,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyAppShell>;

export const WithBooksAndCalendar: Story = {
  render: () => {
    return (
      <MyAppShell>
        <BookItems bookItems={mockBooks} />
        <Calendar />
      </MyAppShell>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get(
          `${process.env.NEXT_PUBLIC_RAILS_API_URL}/reading_logs`,
          () => {
            return HttpResponse.json(readingLogs);
          },
        ),
      ],
    },
  },
};
