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
  ScrollArea,
  Title,
  Button,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import { BookWithMemos, Heading } from '@/types/index';
import MemoLoading from '@/components/loading/MemoLoading';
import { axiosInstance, setHeader } from '@/lib/axios';
import useAddHeading from '@/hooks/useAddHeading';
import SaveData from '@/utils/saveData';
import toast from 'react-hot-toast';
import useUpdateBookStatus from '@/hooks/useUpdateBookStatus';

type GridItemType = {
  imageSpan: number | undefined;
  bookInfoSpan: number | undefined;
  offset: number | undefined;
  bookWithMemos: BookWithMemos;
  setBookWithMemos: React.Dispatch<
    React.SetStateAction<BookWithMemos | undefined>
  >;
};

function GridItem({
  imageSpan,
  bookInfoSpan,
  offset,
  bookWithMemos,
  setBookWithMemos,
}: GridItemType) {
  const { handleSubmit } = useUpdateBookStatus({
    userBookId: bookWithMemos.id,
    setBookWithMemos,
  });

  return (
    <>
      <GridCol span={imageSpan}>
        <Image
          radius="lg"
          w={141}
          h={200}
          src={bookWithMemos.book.coverImageUrl}
          alt={bookWithMemos.book.title}
        />
      </GridCol>
      <GridCol offset={offset} span={bookInfoSpan}>
        <Title size="h3">
          <Text inherit>{bookWithMemos.book.title}</Text>
        </Title>
        <Text size="md" mt="10">
          著者 : {bookWithMemos.book.author}
        </Text>
        <SegmentedControl
          mt="md"
          color="blue"
          value={bookWithMemos.status}
          onChange={(value) => handleSubmit(value)}
          size="md"
          data={[
            { label: 'まだ読んでない', value: 'unread' },
            { label: '読んでる途中', value: 'reading' },
            { label: '全部読んだ', value: 'finished' },
          ]}
        />
      </GridCol>
    </>
  );
}

export default function MemoPageContent() {
  const isLargeScreen = useMediaQuery('(min-width: 48em)');
  const dynamicParams = useParams<{ bookId: string }>();
  const bookId = Number(dynamicParams.bookId);
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;
  const { handleAddHeading } = useAddHeading();
  const params = {
    bookId,
  };
  const [bookWithMemos, setBookWithMemos] = useState<BookWithMemos>();
  const [heading, setHeading] = useState('1');

  const fetchable = status === 'authenticated' && session?.user?.email;

  async function fetcher(url: string, params: { bookId: number }) {
    await setHeader(token);
    const res = await axiosInstance.get(url, { params });
    return res.data;
  }

  const { error, isLoading } = useSWR(
    fetchable ? ['/memos', params] : null,
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        setBookWithMemos(data);
      },
    },
  );

  const handleSaveAll = async (
    title: string,
    headingId: number,
    content: string,
    memoId: number,
  ) => {
    if (!token) {
      return false;
    }

    try {
      await Promise.all([
        SaveData({ token, id: headingId, data: title, type: 'heading' }),
        SaveData({ token, id: memoId, data: content, type: 'memo' }),
      ]);

      setBookWithMemos((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          headings: prev.headings.map((h) =>
            h.id === headingId
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

      toast.success('保存しました。');
    } catch (error) {
      console.warn(error);
      toast.error('保存に失敗しました。');
    }
  };

  const handleAddNewHeading = async () => {
    if (!bookWithMemos) {
      toast.error('章の追加に失敗しました。');
      return false;
    }

    const newHeading = await handleAddHeading(
      bookWithMemos,
      bookWithMemos.headings.length + 1,
    );

    if (newHeading) {
      setBookWithMemos((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          headings: [...prev.headings, newHeading],
        };
      });
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading || !bookWithMemos)
    return (
      <div>
        <MemoLoading />
      </div>
    );

  return (
    <>
      <title>{`${bookWithMemos?.book.title}のメモページ`}</title>
      <Container my={'md'}>
        <Grid>
          <GridItem
            imageSpan={isLargeScreen ? 3 : undefined}
            bookInfoSpan={isLargeScreen ? 8 : undefined}
            offset={isLargeScreen ? 1 : undefined}
            bookWithMemos={bookWithMemos}
            setBookWithMemos={setBookWithMemos}
          />
        </Grid>
        <Space h="20" />
        <Grid>
          <GridCol span={9}>
            <ScrollArea scrollHideDelay={0}>
              <SegmentedControl
                value={heading}
                onChange={setHeading}
                fullWidth
                size="md"
                data={
                  bookWithMemos.headings.map((heading: Heading) => ({
                    label: `${heading.number}章`,
                    value: String(heading.number),
                  })) ?? []
                }
              />
            </ScrollArea>
          </GridCol>
          <GridCol offset={1} span={2}>
            <Button
              size="md"
              variant="default"
              fullWidth
              onClick={handleAddNewHeading}
            >
              追加
            </Button>
          </GridCol>
        </Grid>
        <Space h={50} />
        <Editor
          heading={bookWithMemos?.headings[Number(heading) - 1]}
          headingId={bookWithMemos?.headings[Number(heading) - 1].id}
          handleSaveAll={handleSaveAll}
        />
      </Container>
    </>
  );
}
