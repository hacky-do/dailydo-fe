import { format } from 'date-fns';
import { redirect } from 'next/navigation';

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  if (!DATE_REGEX.test(date)) {
    redirect(`/mylogs/${format(new Date(), 'yyyy-MM-dd')}`);
  }
}
