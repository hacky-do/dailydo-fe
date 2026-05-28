import { MobileHeader, PcHeader } from '@/widgets/header';

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full w-full min-w-90 flex-col">
      <PcHeader className="hidden md:block" />
      <MobileHeader className="md:hidden" />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
