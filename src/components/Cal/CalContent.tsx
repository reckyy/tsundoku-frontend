'use client';

import { ScrollArea } from '@mantine/core';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { ReadingLogs } from '@/types/index';

export default function CalContent({ readingLogs }: ReadingLogs) {
  const value = readingLogs.map((log) => ({
    date: log.date.replace('-', '/'),
    count: log.count,
  }));
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <ScrollArea w={600}>
      <HeatMap
        value={value}
        width={720}
        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
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
  );
}
