import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

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

const InteractionDemo = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) =>
          loading ? (
            <Skeleton key={i} variant="lg" />
          ) : (
            <span key={i} className="size-15 rounded-xl bg-gray-100" />
          ),
        )}
      </div>
      {loading ? (
        <Skeleton className="size-30 rounded-full" />
      ) : (
        <span className="size-30 rounded-full bg-gray-100" />
      )}
      <button
        onClick={() => setLoading((v) => !v)}
        className="w-30 rounded-lg bg-gray-800 py-1 text-sm text-white"
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
