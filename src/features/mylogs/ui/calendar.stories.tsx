import type { Meta, StoryObj } from '@storybook/nextjs';

import type { DailyCount } from '../model/mylogs.types';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Features/Calendar',
  component: Calendar,
  argTypes: {
    logs: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const mockLogs: DailyCount[] = [
  { date: '2026-06-01', count: 1, total: 5 },
  { date: '2026-06-02', count: 3, total: 5 },
  { date: '2026-06-03', count: 5, total: 5 },
  { date: '2026-06-04', count: 2, total: 5 },
  { date: '2026-06-05', count: 5, total: 5 },
  { date: '2026-06-07', count: 4, total: 5 },
  { date: '2026-06-08', count: 3, total: 5 },
  { date: '2026-06-09', count: 1, total: 5 },
  { date: '2026-06-10', count: 3, total: 5 },
  { date: '2026-06-12', count: 2, total: 5 },
  { date: '2026-06-13', count: 5, total: 5 },
  { date: '2026-06-14', count: 5, total: 5 },
  { date: '2026-06-15', count: 1, total: 5 },
  { date: '2026-06-16', count: 4, total: 5 },
  { date: '2026-06-17', count: 3, total: 5 },
  { date: '2026-06-19', count: 3, total: 5 },
  { date: '2026-06-20', count: 5, total: 5 },
  { date: '2026-06-21', count: 2, total: 5 },
  { date: '2026-06-22', count: 5, total: 5 },
  { date: '2026-06-23', count: 1, total: 5 },
  { date: '2026-06-24', count: 4, total: 5 },
  { date: '2026-06-25', count: 4, total: 5 },
  { date: '2026-06-27', count: 5, total: 5 },
  { date: '2026-06-28', count: 3, total: 5 },
  { date: '2026-06-29', count: 2, total: 5 },
  { date: '2026-06-30', count: 5, total: 5 },
];

export const Default: Story = {
  args: {
    year: 2026,
    month: 6,
    logs: [],
  },
};

export const WithData: Story = {
  args: {
    year: 2026,
    month: 6,
    logs: mockLogs,
  },
};
