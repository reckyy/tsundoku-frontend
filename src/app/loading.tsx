import { Loader, Center } from '@mantine/core';

export default function Loading() {
  return (
    <Center style={{ width: '100vw', height: '80vh' }}>
      <Loader color="blue" type="dots" size="xl" />
    </Center>
  );
}
