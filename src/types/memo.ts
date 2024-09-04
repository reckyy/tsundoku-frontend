export type Memo = {
  id: number;
  body: string;
};

export type MemoParams = {
  userId: string | undefined;
  bookId: number;
};
