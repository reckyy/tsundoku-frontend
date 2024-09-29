import { Heading } from './heading';

export type HandleSaveType = (
  content: string,
  title: string,
) => void;

export type EditorProps = {
  heading: Heading | undefined;
  handleSave: HandleSaveType;
};
