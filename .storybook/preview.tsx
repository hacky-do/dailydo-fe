import type { Preview } from '@storybook/nextjs';

import '../src/app/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 430,
          minWidth: 360,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
