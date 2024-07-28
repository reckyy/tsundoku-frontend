import { Book } from '@/types/index';

export type SearchFormProps = {
  onResults: (results: Book[]) => void;
};

export type FeatureProps = {
  title: string;
  src: string;
  introduction: string;
};
