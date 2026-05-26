interface Mission {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  image: string;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
  isSpecial: boolean;
}

export type { Mission };
