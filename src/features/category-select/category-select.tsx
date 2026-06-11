'use client';

import { useGetMissionCategories } from '@/entities/category';
import { CategoryCard } from '@/shared/ui/category-card';

interface CategorySelectProps {
  value: number[];
  onChange: (ids: number[]) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { data: categories } = useGetMissionCategories();

  const handleToggle = (id: number) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {categories.map((category) => (
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
