import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const author = searchParams.get('author');

  const applicationId = process.env.RAKUTEN_API_APPLICATION_ID;
  const accessKey = process.env.RAKUTEN_API_ACCESS_KEY;
  const apiUrl =
    'https://openapi.rakuten.co.jp/services/api/BooksBook/Search/20170404';

  if (!applicationId || !accessKey) {
    return NextResponse.json(
      { error: '楽天APIの設定が不足しています。' },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({ applicationId, accessKey });
  if (title) params.set('title', title);
  if (author) params.set('author', author);

  try {
    const res = await fetch(`${apiUrl}?${params.toString()}`, {
      headers: {
        Origin: 'https://tsundoku.tech',
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: '楽天APIへのリクエストに失敗しました。' },
        { status: 502 },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: '楽天APIへのリクエストに失敗しました。' },
      { status: 502 },
    );
  }
}
