import type { Meta, StoryObj } from '@storybook/nextjs';

import { TextSkeleton } from './text-skeleton';

const meta: Meta<typeof TextSkeleton> = {
  title: 'Shared/Skeleton/TextSkeleton',
  component: TextSkeleton,
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TextSkeleton>;

const items = [
  {
    text: 'Pretendard Text 3xl',
    className: 'text-3xl font-bold',
    skeletonClassName: 'w-[280px]',
    variant: '3xl',
  },
  {
    text: 'Pretendard Text 2xl',
    className: 'text-2xl font-bold',
    skeletonClassName: 'w-[230px]',
    variant: '2xl',
  },
  {
    text: 'Pretendard Text xl',
    className: 'text-xl font-bold',
    skeletonClassName: 'w-[180px]',
    variant: 'xl',
  },
  {
    text: 'Pretendard Text lg',
    className: 'text-lg font-semibold',
    skeletonClassName: 'w-[160px]',
    variant: 'lg',
  },
  {
    text: 'Pretendard Text base',
    className: 'text-base',
    skeletonClassName: 'w-[160px]',
    variant: 'base',
  },
  {
    text: 'Pretendard Text sm',
    className: 'text-sm',
    skeletonClassName: 'w-[130px]',
    variant: 'sm',
  },
] as const;

export const Default: Story = {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    },
  },
  args: {
    variant: 'base',
  },
};

export const Interaction: StoryObj<{ loading: boolean }> = {
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: {
    loading: false,
  },
  render: ({ loading }) => (
    <div className="flex flex-col gap-2">
      {loading
        ? items.map(({ skeletonClassName, variant }, i) => (
            <TextSkeleton
              key={i}
              className={skeletonClassName}
              variant={variant}
            />
          ))
        : items.map(({ text, className }, i) => (
            <div key={i} className={className}>
              {text}
            </div>
          ))}
    </div>
  ),
};
