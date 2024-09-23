import {
  Container,
  Space,
  Paper,
  Text,
  Skeleton,
  Grid,
  GridCol,
  Center,
} from '@mantine/core';

export default function TopLoading() {
  return (
    <Container my="md">
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
      <Paper withBorder shadow="xs" radius="md" p="xl">
        <Text ta={'center'}>毎日、コツコツと。</Text>
        <Space h={20} />
        <Skeleton height={200} />
      </Paper>
    </Container>
  );
}
