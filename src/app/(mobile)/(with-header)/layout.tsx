import { MobileHeader } from '@/widgets/header';

export default function MobileWithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <MobileHeader />
      <main>{children}</main>
    </div>
  );
}
