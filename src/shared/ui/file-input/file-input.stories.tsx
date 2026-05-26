import type { Meta, StoryObj } from '@storybook/nextjs';

import { FileInput } from './file-input';

const meta: Meta<typeof FileInput> = {
  title: 'Shared/FileInput',
  component: FileInput,
  argTypes: {
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};
