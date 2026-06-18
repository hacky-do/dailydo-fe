import { format } from 'date-fns';

import { MONTH_REGEX } from '@/entities/mylogs';
import { MylogsPage } from '@/views/mylogs';

interface PageProps {
  searchParams: Promise<{ month?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month } = await searchParams;

  const today = format(new Date(), 'yyyy-MM');
  const resolvedMonth = month && MONTH_REGEX.test(month) ? month : today;

  return <MylogsPage month={resolvedMonth} />;
}
