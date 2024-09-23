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
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useSession, SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  MemoParams,
  BookWithMemo,
  HandleSaveType,
  Heading,
  GridItemType,
} from '@/types/index';
import MemoLoading from '@/components/loading/MemoLoading';

export default function Page() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}
function GridItem({
  imageSpan,
  headingSpan,
  offset,
  imageSrc,
  imageAlt,
  headings,
  heading,
  setHeading,
}: GridItemType) {
  return (
    <>
      <GridCol span={imageSpan}>
        <Image radius="lg" w={141} h={200} src={imageSrc} alt={imageAlt} />
      </GridCol>
      <GridCol offset={offset} span={headingSpan}>
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
                headings.map((heading: Heading) => String(heading.number)) ?? []
              }
            />
          </ScrollArea>
        </Paper>
      </GridCol>
    </>
  );
}

function PageContent() {
  const matches = useMediaQuery('(min-width: 48em)');
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
      await Promise.all([
        axios.patch(`${apiUrl}/headings/${headingId}`, {
          userId: session?.user?.id,
          id: headingId,
          title,
        }),
        axios.patch(`${apiMemoUrl}/${memoId}`, {
          userId: session?.user?.id,
          memo: {
            id: memoId,
            body: content,
          },
        }),
        axios.post(`${apiUrl}/reading_logs`, {
          userId: session?.user?.id,
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
      return true;
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
          <GridItem
            imageSpan={matches ? 3 : undefined}
            headingSpan={matches ? 6 : undefined}
            offset={matches ? 1 : undefined}
            imageSrc={bookWithMemos?.book.coverImageUrl}
            imageAlt={bookWithMemos?.book.title}
            headings={bookWithMemos?.headings || []}
            heading={heading}
            setHeading={setHeading}
          />
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
