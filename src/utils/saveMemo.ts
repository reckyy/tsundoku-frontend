import toast from 'react-hot-toast';
import { saveMemoType } from '@/types/index';
import { axiosInstance, setHeader } from '@/lib/axios';

export default async function SaveMemo({
  token,
  bookWithMemos,
  setBookWithMemos,
  heading,
  content,
  title,
}: saveMemoType) {
  const currentHeading = bookWithMemos?.headings[Number(heading) - 1];
  const memoId = currentHeading?.memo.id;
  const headingId = currentHeading?.id;

  await setHeader(token!);

  try {
    await Promise.all([
      axiosInstance.patch(`/headings/${headingId}`, {
        id: headingId,
        title,
      }),
      axiosInstance.patch(`/memos/${memoId}`, {
        memo: {
          id: memoId,
          body: content,
        },
      }),
      axiosInstance.post(`/reading_logs`, {
        memoId,
      }),
    ]);
    setBookWithMemos((bookWithMemos) => {
      if (!bookWithMemos) return bookWithMemos;

      return {
        ...bookWithMemos,
        headings: bookWithMemos.headings.map((h) =>
          h.number === Number(heading)
            ? {
                ...h,
                title,
                memo: {
                  ...h.memo,
                  body: content,
                },
              }
            : h,
        ),
      };
    });
    toast.success('メモの保存に成功しました！');
  } catch (error) {
    toast.error('メモの保存に失敗しました。');
  }
}
