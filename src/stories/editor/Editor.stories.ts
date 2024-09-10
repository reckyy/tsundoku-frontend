import type { Meta, StoryObj } from '@storybook/react';

import Editor from '@/components/editor/Editor';

const testData = {
  id: 1,
  number: 1,
  title: '第1章',
  memo: {
    id: 1,
    body: '第1章のメモ',
  },
}

const meta: Meta<typeof Editor> = {
  component: Editor,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    heading: testData,
  }
};

export default meta;
type Story = StoryObj<typeof Editor>;

export const AppearenceTest: Story = {
  args: {}
};
