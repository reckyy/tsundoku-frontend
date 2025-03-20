import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import Calendar from '@/components/calendar/Calendar';
import { userEvent, within, expect, waitFor, screen } from '@storybook/test';

const currentYear = dayjs().year();
const lastYear = currentYear - 1;
const previousDay = dayjs().subtract(1, 'd').format('YYYY-MM-DD');
const today = dayjs().format('YYYY-MM-DD');

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  parameters: {
    Calendarayout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    readingLogs: {
      [lastYear]: [
        {
          date: dayjs().subtract(365, 'day').format('YYYY-MM-DD'),
          count: 2,
        },
      ],
      [currentYear]: [
        {
          date: previousDay,
          count: 1,
        },
        {
          date: today,
          count: 3,
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const AppearenceTest: Story = {
  args: {},
};

export const ChangeYearTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleYearButton = canvas.getByText(`Year: ${currentYear}`);
    await userEvent.click(toggleYearButton);
    const lasyYearButton = screen.getByText(`${lastYear}`);
    await userEvent.click(lasyYearButton);
    await waitFor(() => {
      expect(screen.getByText(`Year: ${lastYear}`)).toBeInTheDocument();
    });
  },
};
