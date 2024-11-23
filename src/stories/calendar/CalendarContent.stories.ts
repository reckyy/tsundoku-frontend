import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import CalendarContent from '@/components/calendar/CalendarContent';

const previousDay = dayjs().subtract(1, 'd').format('YYYY-MM-DD');
const today = dayjs().format('YYYY-MM-DD');

const meta: Meta<typeof CalendarContent> = {
  component: CalendarContent,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarContent>;

export const AppearenceTest: Story = {
  args: {
    readingLogs: [
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
};
