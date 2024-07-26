import { Book } from '@/types/index';

export type SearchFormProps = {
  onResults: (results: Book[]) => void;
};
