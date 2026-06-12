'use client';

import { COLLECTION_TABS, CollectionTab } from '@/entities/collection';
import { cn } from '@/shared/utils/cn';

interface CollectionTabsProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export const CollectionTabs = ({
  selectedId,
  onSelect,
}: CollectionTabsProps) => {
  return (
    <div className="flex justify-around border-b border-gray-200">
      {COLLECTION_TABS.map((tab: CollectionTab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={cn(
            'flex-1 py-2 pb-2 text-sm font-semibold whitespace-nowrap transition-colors',
            selectedId === tab.id
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-600',
          )}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};
