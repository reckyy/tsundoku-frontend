import { Center, Grid, GridCol, SegmentedControl } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Filter } from '@/types/index';

const FILTER_DATA = [
  { label: 'まだ読んでない', value: 'unread_books' },
  { label: '読んでる途中', value: 'reading_books' },
  { label: '全部読んだ', value: 'finished_books' },
];

export const EMPTY_MESSAGES: Record<Filter, string> = {
  unread_books: '「本を追加」から読む本を追加しましょう！',
  reading_books: '今読んでいる本はありません。',
  finished_books: '読み終わった本はありません。',
};

export type BookFilterSegmentedControlProps = {
  value: Filter;
  onChange: (value: Filter) => void;
};

export default function BookFilterSegmentedControl({
  value,
  onChange,
}: BookFilterSegmentedControlProps) {
  const isLargeScreen = useMediaQuery('(min-width: 48em)');

  return isLargeScreen ? (
    <Grid>
      <GridCol offset={2} span={8}>
        <SegmentedControl
          color="blue"
          fullWidth
          value={value}
          onChange={(v) => onChange(v as Filter)}
          size="md"
          data={FILTER_DATA}
        />
      </GridCol>
    </Grid>
  ) : (
    <Center>
      <SegmentedControl
        color="blue"
        value={value}
        onChange={(v) => onChange(v as Filter)}
        size="sm"
        data={FILTER_DATA}
      />
    </Center>
  );
}
