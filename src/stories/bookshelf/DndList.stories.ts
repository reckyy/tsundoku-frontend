import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import DndList from '@/components/bookshelf/DndList';

const meta: Meta<typeof DndList> = {
  component: DndList,
  parameters: {
    layout: 'centered',
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
        title: 'プロを目指す人のためのRuby入門［改訂2版］　言語仕様からテスト駆動開発・デバッグ技法まで',
        author: '伊藤 淳一',
        coverImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/4373/9784297124373_1_5.jpg?_ex=200x200',
      },
    ]
  }
};

export default meta;
type Story = StoryObj<typeof DndList>;

export const AppearenceTest: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post(`${process.env.NEXT_PUBLIC_RAILS_API_URL}/user_books/move_position`, () => {
          return new HttpResponse;
        }),
      ],
    },
  },
};
