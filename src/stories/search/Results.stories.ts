import type { Meta, StoryObj } from '@storybook/react';

import Results from '@/components/search/Results';

const meta: Meta<typeof Results> = {
  component: Results,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Results>;

export const FirstStory: Story = {
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
  },
};
