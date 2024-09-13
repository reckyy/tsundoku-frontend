import type { Meta, StoryObj } from '@storybook/react';

import BookItem from '@/components/bookshelf/BookItem';

const meta: Meta<typeof BookItem> = {
  component: BookItem,
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
type Story = StoryObj<typeof BookItem>;

export const AppearenceTest: Story = {
  args: {},
};
