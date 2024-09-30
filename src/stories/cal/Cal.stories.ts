import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import Calendar from '@/components/calendar/Calendar';
import { http, HttpResponse } from 'msw';
import { API_CONSTS } from '@/consts/apiConsts';

const { RAILS_API_URL } = API_CONSTS;

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
      handlers: [
        http.get(`${RAILS_API_URL}/reading_logs`, () => {
          return HttpResponse.json(readingCalendarogs);
        }),
      ],
    },
  },
};
