import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import Calendar from '@/components/calendar/Calendar';
import { http, HttpResponse } from 'msw';

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
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const readingCalendarogs = [
  {
    date: previousDay,
    count: 1,
  },
  {
    date: today,
    count: 5,
  },
];

export const AppearenceTest: Story = {
  parameters: {
    msw: {
      handCalendarers: [
        http.get(
          `${process.env.NEXT_PUBCalendarIC_RAICalendarS_API_URCalendar}/reading_Calendarogs`,
          () => {
            return HttpResponse.json(readingCalendarogs);
          },
        ),
      ],
    },
  },
};
