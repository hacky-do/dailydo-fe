import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { CategoryCard } from './categoy-card';

const meta: Meta<typeof CategoryCard> = {
  title: 'Shared/CategoryCard',
  component: CategoryCard,
  args: {
    id: 'hobby',
    label: '취미/창작',
    image: '/images/img_category01.svg',
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

const withToggle = (story: Story, initialChecked = false): Story => ({
  ...story,
  render: (args) => {
    const [checked, setChecked] = useState(initialChecked);

    return (
      <div className="size-36">
        <CategoryCard
          {...args}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
      </div>
    );
  },
});

export const Unchecked: Story = withToggle({});

export const Checked: Story = withToggle({}, true);

export const Grid: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const categories = [
      {
        id: 'hobby',
        label: '취미/창작',
        image: '/images/img_category01.svg',
      },
      {
        id: 'study',
        label: '스터디/성장',
        image: '/images/img_category02.svg',
      },
      {
        id: 'challange',
        label: '도전/탐험',
        image: '/images/img_category03.svg',
      },
      {
        id: 'exercise',
        label: '운동/건강',
        image: '/images/img_category04.svg',
      },
      {
        id: 'relationship',
        label: '관계/휴식',
        image: '/images/img_category05.svg',
      },
      {
        id: 'health',
        label: '자연/힐링',
        image: '/images/img_category06.svg',
      },
    ];

    const toggle = (id: string) =>
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
      );

    return (
      <div className="grid grid-cols-2 gap-5">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            label={cat.label}
            image={cat.image}
            checked={selected.includes(cat.id)}
            onChange={() => toggle(cat.id)}
          />
        ))}
      </div>
    );
  },
};
