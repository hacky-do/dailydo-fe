import { redirect } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (error) {
    redirect(`${ROUTES.LOGIN}?error=${encodeURIComponent(error)}`);
  }

  redirect(ROUTES.MISSIONS);
}
