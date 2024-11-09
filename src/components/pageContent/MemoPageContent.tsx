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
  Tooltip,
  Modal,
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
import { IconPlayerPlay, IconCheck, IconHourglass } from '@tabler/icons-react';
import ChangeToReadingModal from '@/components/modal/ChangeToReadingModal';
import ChangeToFinishedModal from '@/components/modal/ChangeToFinishedModal';

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
  const [readingButtonModalOpened, setReadingButtonModalOpened] =
    useState(false);
  const [finishedButtonModalOpened, setFinishedButtonModalOpened] =
    useState(false);
  const isUnread = bookWithMemos.status === 'unread';
  const isReading = bookWithMemos.status === 'reading';

  const handleButtonClick = () => {
    if (isUnread) {
      setReadingButtonModalOpened(true);
    } else if (isReading) {
      setFinishedButtonModalOpened(true);
    }
  };

  return (
    <>
      <Modal
        opened={readingButtonModalOpened}
        radius="md"
        onClose={() => setReadingButtonModalOpened(false)}
        centered
      >
        <ChangeToReadingModal
          userBookId={bookWithMemos.id}
          setBookWithMemos={setBookWithMemos}
          setModalOpened={setReadingButtonModalOpened}
        />
      </Modal>
      <Modal
        opened={finishedButtonModalOpened}
        radius="md"
        onClose={() => setFinishedButtonModalOpened(false)}
        centered
      >
        <ChangeToFinishedModal
          userBookId={bookWithMemos.id}
          setBookWithMemos={setBookWithMemos}
          setModalOpened={setFinishedButtonModalOpened}
        />
      </Modal>
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
        <Title size="h2">{bookWithMemos.book.title}</Title>
        <Text size="lg" mt="10">
          著者 : {bookWithMemos.book.author}
        </Text>
        <Tooltip label="読書ステータスを変更できます。" position="bottom">
          <Button
            color="green"
            mt="md"
            rightSection={
              isUnread ? (
                <IconPlayerPlay size={14} />
              ) : isReading ? (
                <IconHourglass size={14} />
              ) : (
                <IconCheck size={14} />
              )
            }
            disabled={!isUnread && !isReading}
            onClick={handleButtonClick}
          >
            {isUnread ? '未読' : isReading ? '読書中' : '読了'}
          </Button>
        </Tooltip>
      </GridCol>
    </>
  );
}

export default function MemoPageContent() {
  const isLargeScreen = useMediaQuery('(min-width: 48em)');
  const dynamicParams = useParams<{ bookId: string }>();
  const bookId = Number(dynamicParams.bookId);
  const { data: session, status } = useSession();
  const token = session?.user?.idToken;
  const { handleAddHeading } = useAddHeading();
  const params = {
    bookId,
  };
  const [bookWithMemos, setBookWithMemos] = useState<BookWithMemos>();
  const [heading, setHeading] = useState('1');

  const fetchable = status === 'authenticated' && session?.user?.email;

  async function fetcher(url: string, params: { bookId: number }) {
    await setHeader(token!);
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

  const handleSave = async (
    type: 'heading' | 'memo',
    id: number,
    data: string,
  ): Promise<boolean> => {
    if (!token) {
      return false;
    }
    const saved = await SaveData({
      token,
      id,
      data,
      type,
    });
    return saved;
  };

  const handleSaveHeading = async (title: string, headingId: number) => {
    const headingSaved = await handleSave('heading', headingId, title);

    if (headingSaved) {
      setBookWithMemos((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          headings: prev.headings.map((h) =>
            h.id === headingId ? { ...h, title } : h,
          ),
        };
      });
    }
  };

  const handleSaveMemo = async (content: string, memoId: number) => {
    const memoSaved = await handleSave('memo', memoId, content);

    if (memoSaved) {
      setBookWithMemos((prev) => {
        return {
          ...prev!,
          headings: prev!.headings.map((h) =>
            h.memo.id === memoId
              ? { ...h, memo: { ...h.memo, body: content } }
              : h,
          ),
        };
      });
    }
  };

  const handleAddNewHeading = async () => {
    const newHeading = await handleAddHeading(
      bookWithMemos!,
      bookWithMemos!.headings.length + 1,
    );

    if (newHeading) {
      setBookWithMemos((prev) => ({
        ...prev!,
        headings: [...prev!.headings, newHeading],
      }));
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
              variant="light"
              color="green"
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
          handleSaveHeading={handleSaveHeading}
          handleSaveMemo={handleSaveMemo}
        />
      </Container>
    </>
  );
}
