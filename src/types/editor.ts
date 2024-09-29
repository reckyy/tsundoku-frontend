import { Heading } from './heading';

export type EditorProps = {
  heading: Heading | undefined;
  handleSave: (content: string, title: string) => void;
};
