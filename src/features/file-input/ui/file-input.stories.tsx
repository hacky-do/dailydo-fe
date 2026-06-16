import type { Meta, StoryObj } from '@storybook/nextjs';

import { ToastProvider } from '@/shared/ui/toast';

import { FileInput } from './file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Features/FileInput',
  component: FileInput,
  argTypes: {
    onChange: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};
