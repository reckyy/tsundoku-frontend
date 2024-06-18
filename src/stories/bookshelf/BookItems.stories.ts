import type { Meta, StoryObj } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

import BookItems from '@/components/bookshelf/BookItems';

const meta: Meta<typeof BookItems> = {
  component: BookItems,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BookItems>;

const mockBookItems = [
  {
    id: 1,
    title: '実践Next.js -- App Routerで進化するWebアプリ開発',
    author: '吉井 健文',
    cover_image_url:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/0618/9784297140618_1_2.jpg?_ex=120x120',
  },
  {
    id: 2,
    title: '賢さをつくる',
    author: '谷川祐基',
    cover_image_url:
      'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/2338/9784484192338.jpg?_ex=120x120',
  },
];

export const FirstStory: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const fetchMock = createMock(global, 'fetch');
        fetchMock.mockResolvedValue({
          json: async () => mockBookItems,
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: new Headers(),
          redirected: false,
          type: 'basic',
          url: 'http://localhost:3001/api/books/email=tsundoku@example.com',
          clone: function (): Response {
            throw new Error('Function not implemented.');
          },
          body: null,
          bodyUsed: false,
          arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error('Function not implemented.');
          },
          blob: function (): Promise<Blob> {
            throw new Error('Function not implemented.');
          },
          formData: function (): Promise<FormData> {
            throw new Error('Function not implemented.');
          },
          text: function (): Promise<string> {
            throw new Error('Function not implemented.');
          },
        });

        return [fetchMock];
      },
    },
  },
};
