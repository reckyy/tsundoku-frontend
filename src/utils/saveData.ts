import { axiosInstance, setHeader } from '@/lib/axios';

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
  await setHeader(token);

  const url = type === 'heading' ? `/headings/${id}` : `/memos/${id}`;
  const params = type === 'heading' ? { title: data } : { body: data };

  try {
    if (type === 'memo') {
      await Promise.all([
        axiosInstance.patch(url, params),
        axiosInstance.post('/reading_logs', { memoId: id }),
      ]);
      return true;
    } else {
      await axiosInstance.patch(url, params);
      return true;
    }
  } catch (error) {
    console.warn(`${type}の保存に失敗`, error);
    return false;
  }
}
