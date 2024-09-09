import type { Meta, StoryObj } from '@storybook/react';

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
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=120x120',
      },
      {
        id: 2,
        title: '実践Next.js -- App Routerで進化するWebアプリ開発',
        author: '吉井 健文',
        coverImageUrl:
          'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=120x120',
      },
    ],
    id: '1',
  }
};

export default meta;
type Story = StoryObj<typeof DndList>;

export const AppearenceTest: Story = {
  args: {}
};
