'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Category } from '@/entities/category';
import { clientApi } from '@/shared/api/fetch-client';
import { CategoryCard } from '@/shared/ui/category-card';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

export const CategorySelect = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => clientApi.get<Category[]>('/api/category'),
  });

  const toggle = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

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
          checked={selected.includes(category.id)}
          onChange={() => toggle(category.id)}
        />
      ))}
    </div>
  );
};
