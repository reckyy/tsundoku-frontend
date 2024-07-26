import { Memo } from './memo';

export type Heading = {
  id: number;
  number: number;
  title: string | null;
  memo: Memo;
};
