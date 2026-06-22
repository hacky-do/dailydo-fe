'use client';

import { COLLECTION_TABS } from '@/entities/collection';
import { CollectionTab } from '@/entities/collection/model/collection.types';
import { cn } from '@/shared/utils/cn';
import { CollectionTabId } from '@/views/mycollections/ui/collection-page';

interface CollectionTabsProps {
  selectedId: string;
  onSelect: (id: CollectionTabId) => void;
}

export const CollectionTabs = ({
  selectedId,
  onSelect,
}: CollectionTabsProps) => {
  return (
    <div className="mt-5 flex justify-around border-b border-gray-200">
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
