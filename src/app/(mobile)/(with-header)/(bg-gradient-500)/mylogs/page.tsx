import { format } from 'date-fns';

import { MylogsPage } from '@/views/mylogs';

const MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

interface PageProps {
  searchParams: Promise<{ month?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month } = await searchParams;

  const resolvedMonth = month ?? format(new Date(), 'yyyy-MM');

  if (!MONTH_REGEX.test(resolvedMonth)) {
    throw new Error(`잘못된 날짜 형식입니다.`);
  }

  return <MylogsPage month={resolvedMonth} />;
}
