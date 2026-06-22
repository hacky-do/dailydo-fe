import { TextSkeleton } from '@/shared/ui/skeleton';

export const StatList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex divide-x divide-gray-100 rounded-2xl bg-white py-3 shadow">
    {children}
  </ul>
);

interface StatItemProps {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

export const StatItem = ({ label, value, valueClassName }: StatItemProps) => (
  <li className="flex flex-1 flex-col items-center justify-center gap-2 px-1.5">
    <div className="text-sm text-gray-700">{label}</div>
    <div className={`text-2xl font-bold ${valueClassName}`}>{value}</div>
  </li>
);

export const StatItemSkeleton = ({ label }: { label: string }) => (
  <li className="flex flex-1 flex-col items-center justify-center gap-2 px-1.5">
    <div className="text-sm">{label}</div>
    <TextSkeleton variant="2xl" className="w-15" />
  </li>
);
