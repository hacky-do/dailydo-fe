import type { Meta, StoryObj } from '@storybook/nextjs';

import { FallbackUI } from './fallback-ui';

const meta: Meta<typeof FallbackUI> = {
  title: 'Shared/FallbackUI',
  component: FallbackUI,
  argTypes: {
    message: { control: 'text' },
    onReset: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof FallbackUI>;

export const WithReset: Story = {
  args: {
    onReset: () => alert('reset!'),
  },
};

export const WithoutReset: Story = {
  args: {
    onReset: undefined,
  },
};

export const CustomMessage: Story = {
  args: {
    message: '할 일 목록을 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.',
    onReset: () => alert('reset!'),
  },
};
