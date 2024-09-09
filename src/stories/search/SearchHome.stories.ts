import type { Meta, StoryObj } from '@storybook/react';

import SearchHome from '@/components/search/SearchHome';


const meta: Meta<typeof SearchHome> = {
  component: SearchHome,
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
type Story = StoryObj<typeof SearchHome>;

export const AppearenceTest: Story = {
  args: {},
};
