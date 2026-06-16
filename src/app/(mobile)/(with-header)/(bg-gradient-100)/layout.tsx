import { MobileHeader } from '@/features/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-100 relative flex h-full w-full flex-col [--gradient-dir:to_right]">
      <MobileHeader variant="100" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
