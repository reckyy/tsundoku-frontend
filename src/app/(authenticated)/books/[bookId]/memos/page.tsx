'use client';

import Editor from '@/components/editor/Editor';
import {
  Image,
  SegmentedControl,
  Container,
  Grid,
  Text,
  GridCol,
  Space,
  Paper,
  ScrollArea,
} from '@mantine/core';
import { useParams } from 'next/navigation';
import { useSession, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MemoParams, BookWithMemo, HandleSaveType } from '@/types/index';
import MemoLoading from '@/components/loading/MemoLoading';

export default function Page() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}

function PageContent() {
  const apiUrl: string = process.env.NEXT_PUBLIC_RAILS_API_URL ?? '';
  const dynamicParams = useParams<{ bookId: string }>();
  const bookId = Number(dynamicParams.bookId);
  const apiMemoUrl = `${apiUrl}/books/${bookId}/memos`;
  console.log(apiMemoUrl);
  const { data: session, status } = useSession();
  const params = {
    userId: session?.user?.id,
    bookId: bookId,
  };
  const [bookWithMemos, setBookWithMemos] = useState<BookWithMemo>();
  const [heading, setHeading] = useState('1');

  const fetchable = status === 'authenticated' && session?.user?.email;

  async function fetcher(url: string, params: MemoParams) {
    const res = await axios.get(url, { params });
    return {
      book: {
        title: res.data.book.title,
        coverImageUrl: res.data.book.cover_image_url,
      },
      headings: res.data.headings,
    };
  }

  const { error, isLoading } = useSWR(
    fetchable ? [apiMemoUrl, params] : null,
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        setBookWithMemos(data);
      },
    },
  );

  const handleSave: HandleSaveType = async (content, title) => {
    const memoId = bookWithMemos?.headings[Number(heading) - 1].memo.id;
    const headingId = bookWithMemos?.headings[Number(heading) - 1].id;
    try {
      const headingRes = await axios.patch(`${apiUrl}/headings/${headingId}`, {
        userId: session?.user?.id,
        id: headingId,
        title: title,
      });
      const memoRes = await axios.patch(`${apiMemoUrl}/${memoId}`, {
        userId: session?.user?.id,
        memo: {
          id: memoId,
          body: content,
        },
      });
      const logRes = await axios.post(`${apiUrl}/reading_logs`, {
        userId: session?.user?.id,
        memoId: memoId,
      });
      if (
        headingRes.status === 200 &&
        memoRes.status === 200 &&
        logRes.status === 200
      ) {
        setBookWithMemos((bookWithMemos) => {
          if (!bookWithMemos) return bookWithMemos;

          return {
            ...bookWithMemos,
            headings: bookWithMemos.headings.map((h) =>
              h.number === Number(heading)
                ? {
                    ...h,
                    title: title,
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error('メモの保存に失敗しました。');
      return false;
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div>
        <MemoLoading />
      </div>
    );

  return (
    <div>
      <title>{`${bookWithMemos?.book.title}のメモページ`}</title>
      <Container my={'md'}>
        <Grid>
          <GridCol span={3}>
            <Image
              radius="lg"
              w={141}
              h={200}
              src={bookWithMemos?.book.coverImageUrl}
              alt={bookWithMemos?.book.title}
            />
          </GridCol>
          <GridCol offset={1} span={6}>
            <Paper withBorder shadow="xs" radius="md" p="xl">
              <Text size="md" ta={'center'} mb={7}>
                章
              </Text>
              <ScrollArea scrollHideDelay={0}>
                <SegmentedControl
                  value={heading}
                  onChange={setHeading}
                  fullWidth
                  data={
                    bookWithMemos?.headings.map((heading) =>
                      String(heading.number),
                    ) ?? []
                  }
                />
              </ScrollArea>
            </Paper>
          </GridCol>
        </Grid>
        <Space h={50} />
        <Editor
          heading={bookWithMemos?.headings[Number(heading) - 1]}
          handleSave={handleSave}
        />
      </Container>
    </div>
  );
}
