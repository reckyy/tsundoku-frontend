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
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import SaveMemo from '@/utils/saveMemo';
import {
  MemoParams,
  BookWithMemos,
  Heading,
  GridItemType,
} from '@/types/index';
import MemoLoading from '@/components/loading/MemoLoading';
import { API_CONSTS } from '@/consts/apiConsts';

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

export default function MemoPageContent() {
  const { RAILS_API_URL } = API_CONSTS;
  const isLargeScreen = useMediaQuery('(min-width: 48em)');
  const dynamicParams = useParams<{ bookId: string }>();
  const bookId = Number(dynamicParams.bookId);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const params = {
    userId,
    bookId,
  };
  const [bookWithMemos, setBookWithMemos] = useState<BookWithMemos>();
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
    fetchable ? [`${RAILS_API_URL}/memos`, params] : null,
    ([url, params]) => fetcher(url, params),
    {
      onSuccess: (data) => {
        setBookWithMemos(data);
      },
    },
  );

  const handleSave = async (content: string, title: string) => {
    SaveMemo({
      userId,
      bookWithMemos,
      setBookWithMemos,
      heading,
      content,
      title,
    });
  };

  if (error) return <div>failed to load</div>;
  if (isLoading || !bookWithMemos)
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
            imageSpan={isLargeScreen ? 3 : undefined}
            headingSpan={isLargeScreen ? 6 : undefined}
            offset={isLargeScreen ? 1 : undefined}
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
