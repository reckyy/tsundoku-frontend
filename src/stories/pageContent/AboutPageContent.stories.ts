import type { Meta, StoryObj } from '@storybook/react';

import AboutPageContent from '@/components/pageContent/AboutPageContent';

const meta: Meta<typeof AboutPageContent> = {
  component: AboutPageContent,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AboutPageContent>;

export const AppearenceTest: Story = {
  args: {},
};
