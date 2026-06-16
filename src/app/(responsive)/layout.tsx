import { MobileHeader, PcHeader } from '@/features/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full min-w-90 flex-col">
      <PcHeader className="hidden md:block" />
      <MobileHeader variant="100" className="md:hidden" />
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
