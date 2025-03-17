import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import Calendar from '@/components/calendar/Calendar';

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
      2025: [
        {
          date: previousDay,
          count: 1,
        },
        {
          date: today,
          count: 5,
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
