import {
  Container,
  Space,
  Skeleton,
  Grid,
  GridCol,
  Center,
} from '@mantine/core';

export default function TopLoading() {
  return (
    <Container my="md">
      <Space h={20} />
      <Skeleton height={200} />
      <Grid>
        <GridCol span={12}>
          <Space h={40} />
        </GridCol>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridCol span={{ base: 6, sm: 4 }} key={i}>
            <Center>
              <Skeleton width={141} height={200} />
            </Center>
          </GridCol>
        ))}
      </Grid>
      <Space h={60} />
    </Container>
  );
}
