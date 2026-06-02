import { MobileHeader } from '@/widgets/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-500 relative flex h-full w-full flex-col [--gradient-dir:to_right]">
      <MobileHeader variant="500" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
