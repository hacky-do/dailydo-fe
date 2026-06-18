import { format } from 'date-fns';

import { DaylogPage } from '@/views/mylogs';

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { date } = await searchParams;
  const initialDate =
    date && DATE_REGEX.test(date) ? date : format(new Date(), 'yyyy-MM-dd');

  return <DaylogPage initialDate={initialDate} />;
}
