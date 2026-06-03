'use client';

import { useQuery } from '@tanstack/react-query';

import { Category } from '@/entities/category';
import { clientApi } from '@/shared/api/fetch-client';
import { CategoryCard } from '@/shared/ui/category-card';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

interface CategorySelectProps {
  value: number[];
  onChange: (ids: number[]) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => clientApi.get<Category[]>('/api/category'),
  });

  const handleToggle = (id: number) => {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(next);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: categories.length || 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square size-34" />
        ))}
      </div>
    );
  }

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
