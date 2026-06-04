import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';

import type { DailyCount } from '@/features/mylogs/model/mylogs.types';

import { Calendar } from './calendar';

type StoryArgs = Omit<ComponentProps<typeof Calendar>, 'month'> & {
  month: number;
};

const meta: Meta<StoryArgs> = {
  title: 'Features/Calendar',
  argTypes: {
    month: { table: { disable: true } },
    logs: { table: { disable: true } },
  },
  render: ({ month, ...args }) => (
    <Calendar {...args} month={new Date(month)} />
  ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

const mockLogs: DailyCount[] = [
  { date: '2026-06-01', count: 1 },
  { date: '2026-06-02', count: 3 },
  { date: '2026-06-03', count: 5 },
  { date: '2026-06-04', count: 2 },
  { date: '2026-06-05', count: 5 },
  { date: '2026-06-07', count: 4 },
  { date: '2026-06-08', count: 3 },
  { date: '2026-06-09', count: 1 },
  { date: '2026-06-10', count: 3 },
  { date: '2026-06-12', count: 2 },
  { date: '2026-06-13', count: 5 },
  { date: '2026-06-14', count: 5 },
  { date: '2026-06-15', count: 1 },
  { date: '2026-06-16', count: 4 },
  { date: '2026-06-17', count: 3 },
  { date: '2026-06-19', count: 3 },
  { date: '2026-06-20', count: 5 },
  { date: '2026-06-21', count: 2 },
  { date: '2026-06-22', count: 5 },
  { date: '2026-06-23', count: 1 },
  { date: '2026-06-24', count: 4 },
  { date: '2026-06-25', count: 4 },
  { date: '2026-06-27', count: 5 },
  { date: '2026-06-28', count: 3 },
  { date: '2026-06-29', count: 2 },
  { date: '2026-06-30', count: 5 },
];

export const Default: Story = {
  argTypes: {
    month: { control: 'date' },
  },
  args: {
    month: new Date(2026, 5, 1).getTime(),
    logs: [],
  },
};

export const WithData: Story = {
  args: {
    month: new Date(2026, 5, 1).getTime(),
    logs: mockLogs,
  },
};
