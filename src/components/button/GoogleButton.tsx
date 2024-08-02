import { Button, ButtonProps } from '@mantine/core';
import GoogleIcon from '../icon/GoogleIcon';

const GoogleButton = (
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>,
) => {
  return (
    <Button
      size="md"
      radius="md"
      leftSection={<GoogleIcon />}
      variant="default"
      {...props}
    />
  );
};

export default GoogleButton;
