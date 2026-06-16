'use client';

import { Category } from '@/entities/category';
import { CategoryCard } from '@/shared/ui/category-card';

interface CategorySelectProps {
  categories: Category[];
  value: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}

export const CategorySelect = ({
  categories,
  value,
  onChange,
  disabled,
}: CategorySelectProps) => {
  const handleToggle = (id: number) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(next);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          id={String(category.id)}
          label={category.name}
          image={category.image}
          checked={value.includes(category.id)}
          onChange={() => handleToggle(category.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
