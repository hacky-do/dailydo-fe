import type { Meta, StoryObj } from '@storybook/nextjs';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  args: { className: '' },
  argTypes: { className: { control: 'text' } },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const MultipleRows: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} {...args} />
      ))}
    </div>
  ),
};

export const Grid: Story = {
  args: { className: 'h-20' },
  render: (args) => (
    <div className="grid w-full grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} {...args} />
      ))}
    </div>
  ),
};
