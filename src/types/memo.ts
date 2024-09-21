import { Heading } from './heading';
export type Memo = {
  id: number;
  body: string;
};

export type MemoParams = {
  userId: string | undefined;
  bookId: number;
};

export type GridItemType = {
  imageSpan: number | undefined;
  headingSpan: number | undefined;
  offset: number | undefined;
  imageSrc: string | undefined;
  imageAlt: string | undefined;
  headings: Heading[];
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
};
