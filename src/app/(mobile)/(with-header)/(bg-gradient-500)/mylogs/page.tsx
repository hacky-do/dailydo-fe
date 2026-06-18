import { resolveInitialMonth } from '@/entities/mylogs';
import { MylogsPage } from '@/views/mylogs';

interface PageProps {
  searchParams: Promise<{ month?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { month } = await searchParams;

  return <MylogsPage month={resolveInitialMonth(month)} />;
}
