import type { Meta, StoryObj } from '@storybook/react';

import EditorFeature from '@/components/public/EditorFeature';


const meta: Meta<typeof EditorFeature> = {
  component: EditorFeature,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditorFeature>;

export const AppearenceTest: Story = {
  args: {},
};
