import type { Meta, StoryObj } from '@storybook/react';

import BookItems from '@/components/bookshelf/BookItems';

const meta: Meta<typeof BookItems> = {
  component: BookItems,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    bookItems: {
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
        {
          id: 2,
          status: 'unread',
          book: {
            id: 2,
            title:
              'プロを目指す人のためのRuby入門［改訂2版］　言語仕様からテスト駆動開発・デバッグ技法まで',
            author: '伊藤 淳一',
            coverImageUrl:
              'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/4373/9784297124373_1_5.jpg?_ex=200x200',
          },
        },
        {
          id: 3,
          status: 'unread',
          book: {
            id: 3,
            title:
              'プロを目指す人のためのTypeScript入門　安全なコードの書き方から高度な型の使い方まで',
            author: '鈴木 僚太',
            coverImageUrl:
              'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7473/9784297127473_1_3.jpg?_ex=200x200',
          },
        },
      ],
      reading_books: [
        {
          id: 1,
          status: 'reading',
          book: {
            id: 1,
            title: '実践Next.js -- App Routerで進化するWebアプリ開発',
            author: '吉井 健文',
            coverImageUrl:
              'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=200x200',
          },
        },
      ],
      finished_books: [],
    },
    isPublic: false,
  },
};

export default meta;
type Story = StoryObj<typeof BookItems>;

export const AppearenceTest: Story = {
  args: {},
};
