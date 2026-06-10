'use client';

import { Category } from '@/entities/category';
import { CategoryCard } from '@/shared/ui/category-card';

const CATEGORIES: Category[] = [
  { id: 1, name: '취미/창작', image: '/category/hobby.png' },
  { id: 2, name: '스터디/성장', image: '/category/study.png' },
  {
    id: 3,
    name: '도전/탐험',
    image: '/category/challenge.png',
  },
  { id: 4, name: '운동/건강', image: '/category/exercise.png' },
  {
    id: 5,
    name: '관계/휴식',
    image: '/category/relationship.png',
  },
  { id: 6, name: '자연/힐링', image: '/category/heal.png' },
];

interface CategorySelectProps {
  value: number[];
  onChange: (ids: number[]) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const handleToggle = (id: number) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          id={String(category.id)}
          label={category.name}
          image={category.image}
          checked={value.includes(category.id)}
          onChange={() => handleToggle(category.id)}
        />
      ))}
    </div>
  );
};
