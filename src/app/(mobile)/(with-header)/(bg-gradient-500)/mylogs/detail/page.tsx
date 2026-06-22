import { resolveInitialDate } from '@/entities/mylogs';
import { DaylogPage } from '@/views/mylogs';

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { date } = await searchParams;

  return <DaylogPage initialDate={resolveInitialDate(date)} />;
}
