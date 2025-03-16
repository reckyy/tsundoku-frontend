'use client';

import { ScrollArea, Center, Group, Menu, Button } from '@mantine/core';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { Log } from '@/types/index';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

type ReadingLogs = {
  readingLogs: Record<string, Log[]>;
};

type YearItem = {
  label: string;
  target: string;
};

export default function Calendar({ readingLogs }: ReadingLogs) {
  const today = new Date();
  const currentYear = String(today.getFullYear());
  const [year, setYear] = useState(currentYear);

  const noLog = Object.keys(readingLogs).length === 0;

  const value = noLog
    ? []
    : readingLogs[year].map((log) => ({
        date: log.date.replaceAll('-', '/'),
        count: log.count,
      }));
  const data = noLog
    ? [{ label: currentYear, target: currentYear }]
    : Object.keys(readingLogs)
        .reverse()
        .map((year) => ({
          label: year,
          target: year,
        }));
  const selected = data.find((item) => item.target === year) || data[0];

  const handleClick = (item: YearItem) => {
    setYear(item.target);
  };
  const items = data.map((item) => (
    <Menu.Item onClick={() => handleClick(item)} key={item.label}>
      {item.target}
    </Menu.Item>
  ));

  return (
    <>
      <Center>
        <Group
          mb="sm"
          justify="flex-end"
          style={{ width: '100%', maxWidth: '600px' }}
        >
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="default"
                rightSection={<IconChevronDown size={14} />}
              >
                {`Year: ${selected.target}`}
              </Button>
            </Menu.Target>

            <Menu.Dropdown>{items}</Menu.Dropdown>
          </Menu>
        </Group>
      </Center>

      <Center>
        <ScrollArea w={600}>
          <HeatMap
            key={`${year}-heatmap`}
            value={value}
            width={775}
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
            monthPlacement="top"
            startDate={
              year === currentYear
                ? new Date(`${currentYear}-01-01`)
                : new Date(`${year}-01-01`)
            }
            endDate={year === currentYear ? today : new Date(`${year}-12-31`)}
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
    </>
  );
}
