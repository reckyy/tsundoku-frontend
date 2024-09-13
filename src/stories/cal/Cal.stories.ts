import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import Cal from '@/components/cal/Cal';
import { http, HttpResponse } from 'msw';

const previousDay = dayjs().subtract(1, 'd').format('YYYY-MM-DD');
const today = dayjs().format('YYYY-MM-DD');

const meta: Meta<typeof Cal> = {
  component: Cal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cal>;

const readingLogs = [
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
        http.get(
          `${process.env.NEXT_PUBLIC_RAILS_API_URL}/reading_logs`,
          () => {
            return HttpResponse.json(readingLogs);
          },
        ),
      ],
    },
  },
};
