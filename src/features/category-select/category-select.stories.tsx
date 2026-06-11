import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { CategorySelect } from './category-select';

const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const meta: Meta<typeof CategorySelect> = {
  title: 'Features/CategorySelect',
  component: CategorySelect,
  decorators: [
    (Story) => (
      <QueryWrapper>
        <Story />
      </QueryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategorySelect>;

const mockCategories = [
  { id: 1, name: '취미/창작', image: '/common/icons/category_hobby.svg' },
  { id: 2, name: '스터디/성장', image: '/common/icons/category_study.svg' },
  { id: 3, name: '도전/탐험', image: '/common/icons/category_challenge.svg' },
  { id: 4, name: '운동/건강', image: '/common/icons/category_exercise.svg' },
  {
    id: 5,
    name: '관계/휴식',
    image: '/common/icons/category_relationship.svg',
  },
  { id: 6, name: '자연/힐링', image: '/common/icons/category_heal.svg' },
];

export const Default: Story = {
  beforeEach() {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = () =>
      Promise.resolve(
        new Response(
          JSON.stringify({ data: mockCategories, total: mockCategories.length }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    return () => {
      globalThis.fetch = originalFetch;
    };
  },
};

export const Loading: Story = {
  beforeEach() {
    const origialFetch = globalThis.fetch;
    globalThis.fetch = () => new Promise(() => {});
    return () => {
      globalThis.fetch = origialFetch;
    };
  },
};
