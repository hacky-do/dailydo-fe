import type { Meta, StoryObj } from '@storybook/nextjs';

import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    message: '조회된 내용이 없어요.',
  },
};
