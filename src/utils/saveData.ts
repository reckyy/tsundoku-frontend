import { apiPost, apiPatch } from '@/lib/api/client';

export type SaveDataParams = {
  token: string;
  id: number;
  data: string;
  type: 'heading' | 'memo';
};

export default async function saveData({
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
        apiPatch(url, token, params),
        apiPost('/reading_logs', token, { memoId: id }),
      ]);
      return true;
    } else {
      await apiPatch(url, token, params);
      return true;
    }
  } catch (error) {
    console.warn(`${type}の保存に失敗`, error);
    return false;
  }
}
