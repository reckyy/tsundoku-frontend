import type { Meta, StoryObj } from '@storybook/react';

import SearchForm from '@/components/search/SearchForm';


const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    onResults: () => {
      console.log('検索が実行されました')
    }
  }
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const AppearenceTest: Story = {
  args: {},
};
