import { Heading } from './heading';

export type HandleSaveType = (
  content: string,
  title: string,
) => Promise<boolean>;

export type EditorProps = {
  heading: Heading | undefined;
  handleSave: HandleSaveType;
};
