import { Loader, Center } from '@mantine/core';

const DefaultLoader = () => {
  return (
    <Center style={{ width: '100vw', height: '80vh' }}>
      <Loader color="blue" type="dots" size="xl" />
    </Center>
  );
};

export default DefaultLoader;
