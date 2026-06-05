import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import { DayLog } from '@/views/mylogs';

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid date format: ${date}`);
  }
  const formattedDate = format(parseISO(date), 'M월 d일', { locale: ko });
  return <DayLog formattedDate={formattedDate} />;
}
