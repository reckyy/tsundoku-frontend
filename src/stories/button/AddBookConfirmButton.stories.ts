import type { Meta, StoryObj } from '@storybook/react';

import AddBookConfirmButton from '@/components/button/AddBookConfirmButton';

const meta: Meta<typeof AddBookConfirmButton> = {
  component: AddBookConfirmButton,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof AddBookConfirmButton>;

export const AppearenceTest: Story = {
  args: {},
};
