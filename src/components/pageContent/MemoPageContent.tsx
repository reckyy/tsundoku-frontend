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
  ActionIcon,
  rem,
  Tooltip,
  Center,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import { BookWithMemos, Heading } from '@/types/index';
import MemoLoading from '@/components/loading/MemoLoading';
import { axiosGet } from '@/lib/axios';
import useAddHeading from '@/hooks/useAddHeading';
import saveData from '@/utils/saveData';
import toast from 'react-hot-toast';
import useUpdateBookStatus from '@/hooks/useUpdateBookStatus';

type GridItemType = {
  imageSpan: number | undefined;
  bookInfoSpan: number | undefined;
  offset: number | undefined;
  isLargeScreen: boolean | undefined;
  bookWithMemos: BookWithMemos;
  onStatusChange: (status: string) => Promise<void>;
};

function GridItem({
  imageSpan,
  bookInfoSpan,
  offset,
  isLargeScreen,
  bookWithMemos,
  onStatusChange,
}: GridItemType) {
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
        <Title size="h3" ta="center">
          <Text inherit>{bookWithMemos.book.title}</Text>
        </Title>
        {bookWithMemos.book.author && (
          <Text size="md" mt="10" ta="center">
            著者 : {bookWithMemos.book.author}
          </Text>
        )}
        <SegmentedControl
          mt="md"
          color="blue"
          fullWidth={isLargeScreen}
          value={bookWithMemos.status}
          onChange={onStatusChange}
          size={isLargeScreen ? 'md' : 'sm'}
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
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { handleAddHeading } = useAddHeading();
  const [heading, setHeading] = useState('1');

  async function fetcher(url: string) {
    const res = await axiosGet(url, token);
    return res.data;
  }

  const {
    data: bookWithMemos,
    error,
    isLoading,
    mutate,
  } = useSWR<BookWithMemos>(
    token ? `/memos/?bookId=${bookId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const { handleUpdateBookStatus } = useUpdateBookStatus(bookWithMemos?.id);

  const handleStatusChange = async (status: string) => {
    if (!bookWithMemos) return;
    const optimisticData: BookWithMemos = { ...bookWithMemos, status };
    try {
      await mutate(
        async () => {
          await handleUpdateBookStatus(status);
          return optimisticData;
        },
        {
          optimisticData,
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
      toast.success('読書ステータスを更新しました！');
    } catch (error) {
      console.warn(error);
      toast.error('読書ステータスの更新に失敗しました。');
    }
  };

  const handleSaveAll = async (
    title: string,
    headingId: number,
    content: string,
    memoId: number,
  ) => {
    if (!token || !bookWithMemos) {
      return false;
    }

    const optimisticData: BookWithMemos = {
      ...bookWithMemos,
      headings: bookWithMemos.headings.map((h) =>
        h.id === headingId
          ? { ...h, title, memo: { ...h.memo, body: content } }
          : h,
      ),
    };

    try {
      await mutate(
        async () => {
          const [okHeading, okMemo] = await Promise.all([
            saveData({ token, id: headingId, data: title, type: 'heading' }),
            saveData({ token, id: memoId, data: content, type: 'memo' }),
          ]);
          if (!okHeading || !okMemo) throw new Error('save failed');
          return optimisticData;
        },
        {
          optimisticData,
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        },
      );
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
      await mutate(
        (current) =>
          current
            ? { ...current, headings: [...current.headings, newHeading] }
            : current,
        { revalidate: false },
      );
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
            isLargeScreen={isLargeScreen}
            bookWithMemos={bookWithMemos}
            onStatusChange={handleStatusChange}
          />
        </Grid>
        <Space h="20" />
        {isLargeScreen ? (
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
            <GridCol span={1}>
              <Tooltip label="章を追加">
                <ActionIcon
                  size={44}
                  variant="default"
                  onClick={handleAddNewHeading}
                  data-testid="add-heading-button"
                >
                  <IconPlus
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={3}
                  />
                </ActionIcon>
              </Tooltip>
            </GridCol>
          </Grid>
        ) : (
          <Center>
            <ScrollArea scrollHideDelay={0}>
              <SegmentedControl
                value={heading}
                onChange={setHeading}
                fullWidth
                size="sm"
                data={
                  bookWithMemos.headings.map((heading: Heading) => ({
                    label: `${heading.number}章`,
                    value: String(heading.number),
                  })) ?? []
                }
              />
            </ScrollArea>
            <Tooltip label="章を追加">
              <ActionIcon
                size={36}
                ml="xs"
                variant="default"
                onClick={handleAddNewHeading}
                data-testid="add-heading-button"
              >
                <IconPlus
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={3}
                />
              </ActionIcon>
            </Tooltip>
          </Center>
        )}

        <Space h={50} />
        <Editor
          heading={bookWithMemos?.headings[Number(heading) - 1]}
          handleSaveAll={handleSaveAll}
        />
      </Container>
    </>
  );
}
