import type { Meta, StoryObj } from '@storybook/nextjs';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton/Default',
  component: Skeleton,
  argTypes: {
    variant: { control: 'inline-radio', options: ['sm', 'lg'] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: 'lg',
  },
};

export const Circle: Story = {
  argTypes: {
    variant: {
      control: false,
    },
  },
  args: {
    variant: 'lg',
    className: 'rounded-full size-30',
  },
};
