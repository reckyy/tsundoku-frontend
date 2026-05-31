'use client';

import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ja">
      <body>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            gap: '16px',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <h1>予期しないエラーが発生しました</h1>
          <p>もう一度お試しいただくか、トップページに戻ってください。</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button type="button" onClick={reset}>
              再試行
            </button>
            <a href="/">ホームに戻る</a>
          </div>
        </main>
      </body>
    </html>
  );
}
