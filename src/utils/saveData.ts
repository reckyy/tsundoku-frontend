import { axiosPost, axiosPatch } from '@/lib/axios';

export type SaveDataParams = {
  token: string;
  id: number;
  data: string;
  type: 'heading' | 'memo';
};

export default async function SaveData({
  token,
  id,
  data,
  type,
}: SaveDataParams): Promise<boolean> {
  const url = type === 'heading' ? `/headings/${id}` : `/memos/${id}`;
  const params = type === 'heading' ? { title: data } : { body: data };

  try {
    if (type === 'memo') {
      await Promise.all([
        axiosPatch(url, token, params),
        axiosPost('/reading_logs', token, { memoId: id }),
      ]);
      return true;
    } else {
      await axiosPatch(url, token, params);
      return true;
    }
  } catch (error) {
    console.warn(`${type}の保存に失敗`, error);
    return false;
  }
}
