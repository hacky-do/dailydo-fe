export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full min-h-[667px] max-w-107.5 min-w-90 flex-col">
      {children}
      <div
        id="mobile-portal-root"
        className="pointer-events-none fixed inset-y-0 left-1/2 z-200 w-full max-w-107.5 min-w-90 -translate-x-1/2 overflow-hidden"
      />
    </div>
  );
}
