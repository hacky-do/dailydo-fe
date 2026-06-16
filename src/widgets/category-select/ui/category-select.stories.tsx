import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { CategorySelect } from './category-select';

const mockCategories = [
  { id: 1, name: '취미/창작', image: '/category/hobby.png' },
  { id: 2, name: '스터디/성장', image: '/category/study.png' },
  { id: 3, name: '도전/탐험', image: '/category/challenge.png' },
  { id: 4, name: '운동/건강', image: '/category/exercise.png' },
  { id: 5, name: '관계/휴식', image: '/category/relationship.png' },
  { id: 6, name: '자연/힐링', image: '/category/heal.png' },
];

const meta: Meta<typeof CategorySelect> = {
  title: 'Features/CategorySelect',
  component: CategorySelect,
};

export default meta;
type Story = StoryObj<typeof CategorySelect>;

const InteractiveSelect = ({ disabled }: { disabled?: boolean }) => {
  const [value, setValue] = useState<number[]>([]);
  return (
    <CategorySelect
      categories={mockCategories}
      value={value}
      onChange={setValue}
      disabled={disabled}
    />
  );
};

export const Default: Story = {
  render: () => <InteractiveSelect />,
};

export const Disabled: Story = {
  render: () => <InteractiveSelect disabled />,
};
