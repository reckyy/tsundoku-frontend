import type { Preview } from '@storybook/react';
import '@mantine/core/styles.css';
import React from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Toaster } from 'react-hot-toast';

initialize();

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        <Toaster />
        <Story />
      </MantineProvider>
    ),
  ],
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
};

export default preview;
