import type { Meta, StoryObj } from '@storybook/react';
import ToggleColorButton from '@/components/button/ToggleColorButton';
import { userEvent, within, expect, waitFor } from '@storybook/test';

const meta: Meta<typeof ToggleColorButton> = {
  component: ToggleColorButton,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleColorButton>;

export const AppearenceTest: Story = {
  args: {},
};

export const ToggleColorTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const theme = document.documentElement.getAttribute(
        'data-mantine-color-scheme',
      );
      expect(theme === 'light');
    });

    const button = canvas.getByLabelText('ActionIcon to switch color');
    await userEvent.click(button);

    await waitFor(() => {
      const theme = document.documentElement.getAttribute(
        'data-mantine-color-scheme',
      );
      expect(theme === 'dark');
    });
  },
};
