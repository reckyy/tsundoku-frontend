import { Container, Grid, GridCol, Space, Skeleton, Text } from '@mantine/core';

const MemoLoading = () => {
  return (
    <Container my={'md'}>
      <Grid>
        <GridCol span={3}>
          <Skeleton radius="lg" w={141} h={200} />
        </GridCol>
        <GridCol offset={1} span={6}>
          <Text size="md" ta={'center'} mb={7}>
            章
          </Text>
          <Skeleton height={50} />
        </GridCol>
      </Grid>
      <Space h={50} />
      <Grid>
        <GridCol span={12}>
          <Skeleton height={50} />
        </GridCol>
      </Grid>
      <Grid>
        <GridCol span={12}>
          <Skeleton height={200} />
        </GridCol>
      </Grid>
    </Container>
  );
};

export default MemoLoading;
