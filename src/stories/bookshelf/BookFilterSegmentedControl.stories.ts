import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor, fn } from '@storybook/test';
import BookFilterSegmentedControl from '@/components/bookshelf/BookFilterSegmentedControl';

const onChangeSpy = fn();

const meta: Meta<typeof BookFilterSegmentedControl> = {
  component: BookFilterSegmentedControl,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    value: 'unread_books',
    onChange: onChangeSpy,
  },
};

export default meta;
type Story = StoryObj<typeof BookFilterSegmentedControl>;

export const AppearenceTest: Story = {
  args: {},
};

export const ChangeFilterTest: Story = {
  play: async ({ canvasElement }) => {
    onChangeSpy.mockClear();
    const canvas = within(canvasElement);
    const finishedLabel = canvas.getByText('全部読んだ');
    await userEvent.click(finishedLabel);

    await waitFor(() => {
      expect(onChangeSpy).toHaveBeenCalledWith('finished_books');
    });
  },
};
