import { LoginPage } from '@/features/auth/ui';

export default function Page({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return <LoginPage error={searchParams.error} />;
}
