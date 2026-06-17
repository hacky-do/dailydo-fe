export const mylogsQueryKeys = {
  all: ['mylogs'] as const,
  records: (cursor?: string) => ['mylogs', 'records', cursor] as const,
} as const;
