import axios from 'axios';
import toast from 'react-hot-toast';
import { saveMemoType } from '@/types/index';
import { API_CONSTS } from '@/consts/apiConsts';

export default async function SaveMemo({
  userId,
  bookWithMemos,
  setBookWithMemos,
  heading,
  content,
  title,
}: saveMemoType) {
  const { RAILS_API_URL } = API_CONSTS;
  const currentHeading = bookWithMemos?.headings[Number(heading) - 1];
  const memoId = currentHeading?.memo.id;
  const headingId = currentHeading?.id;

  try {
    await Promise.all([
      axios.patch(`${RAILS_API_URL}/headings/${headingId}`, {
        userId,
        id: headingId,
        title,
      }),
      axios.patch(`${RAILS_API_URL}/memos/${memoId}`, {
        userId,
        memo: {
          id: memoId,
          body: content,
        },
      }),
      axios.post(`${RAILS_API_URL}/reading_logs`, {
        userId,
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
