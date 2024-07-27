export type EditorProps = {
  memoBody: string | undefined;
  handleSave: (content: string) => Promise<boolean>;
};
