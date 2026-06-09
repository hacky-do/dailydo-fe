export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-max-[667px] h-full w-full bg-gray-50">
      <div className="mx-auto flex h-full max-w-107.5 min-w-90 flex-col">
        {children}
        <div
          id="mobile-portal-root"
          className="pointer-events-none fixed inset-y-0 left-1/2 z-200 w-full max-w-107.5 min-w-90 -translate-x-1/2 overflow-hidden"
        />
      </div>
    </div>
  );
}
