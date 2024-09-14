'use client';

import { ScrollArea, Center } from '@mantine/core';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { ReadingLogs } from '@/types/index';

export default function CalendarContent({ readingLogs }: ReadingLogs) {
  const value = readingLogs.map((log) => ({
    date: log.date.replace('-', '/'),
    count: log.count,
  }));
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <Center>
      <ScrollArea w={600}>
        <HeatMap
          value={value}
          width={720}
          weekLabels={false}
          monthLabels={[
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ]}
          startDate={new Date(`${currentYear}/01/01`)}
          endDate={today}
          rectProps={{ rx: 3.5 }}
          rectSize={12}
          legendCellSize={0}
          space={2.4}
          panelColors={{
            1: '#c6e48b',
            2: '#32CD32',
            4: '#009900',
            6: '#006400',
          }}
          rectRender={(props, data) => {
            return (
              <Tooltip
                placement="top"
                content={`${data.count || 0} logs on ${data.date}`}
              >
                <rect {...props} />
              </Tooltip>
            );
          }}
        />
      </ScrollArea>
    </Center>
  );
}
