export const mylogsQueryKeys = {
  all: ['mylogs'],
  records: (cursor?: string) => ['mylogs', 'records', cursor],
} as const;
