export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full max-w-107.5 min-w-90 flex-col">
      {children}
    </div>
  );
}
