export const daylogQueryKeys = {
  all: ['mylogs', 'detail'] as const,
  byDate: (date: string) => ['mylogs', 'detail', date] as const,
} as const;
