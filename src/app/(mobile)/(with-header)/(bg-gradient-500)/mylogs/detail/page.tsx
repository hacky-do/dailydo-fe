import { format } from 'date-fns';

import { DATE_REGEX } from '@/entities/mylogs';
import { DaylogPage } from '@/views/mylogs';

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { date } = await searchParams;
  const initialDate =
    date && DATE_REGEX.test(date) ? date : format(new Date(), 'yyyy-MM-dd');

  return <DaylogPage initialDate={initialDate} />;
}
