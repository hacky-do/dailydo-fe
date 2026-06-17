import { format } from 'date-fns';

import { MylogsPage } from '@/views/mylogs';

const MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

interface PageProps {
  searchParams: Promise<{ month?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month } = await searchParams;

  const today = format(new Date(), 'yyyy-MM');
  const resolvedMonth = month && MONTH_REGEX.test(month) ? month : today;

  return <MylogsPage month={resolvedMonth} />;
}
