import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

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

const InteractionDemo = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex flex-col items-start gap-2">
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
      <button
        onClick={() => setLoading((v) => !v)}
        className="mt-2 w-30 rounded-lg bg-gray-800 py-1 text-sm text-white"
      >
        {loading ? 'Skeleton OFF' : 'Skeleton ON'}
      </button>
    </div>
  );
};

export const Interaction: Story = {
  argTypes: {
    variant: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: () => <InteractionDemo />,
};
