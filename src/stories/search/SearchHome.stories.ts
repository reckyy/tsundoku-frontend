import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import SearchHome from '@/components/search/SearchHome';

const meta: Meta<typeof SearchHome> = {
  component: SearchHome,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchHome>;

export const AppearenceTest: Story = {
  args: {},
};

export const SearchBookTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText('search');
    await userEvent.type(searchInput, 'プロを目指す人のためのRuby入門');
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(
        canvas.getByText(/プロを目指す人のためのRuby入門/i),
      ).toBeInTheDocument();
    });
  },
};
