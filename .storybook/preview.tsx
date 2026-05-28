import type { Preview } from '@storybook/nextjs';

import '../src/app/globals.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      if (context.parameters.layout === 'fullscreen') {
        return <Story />;
      }
      return (
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
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export default preview;
