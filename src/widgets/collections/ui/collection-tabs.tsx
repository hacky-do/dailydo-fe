'use client';

import type { CollectionTab, CollectionTabId } from '@/entities/collection';
import { COLLECTION_TABS } from '@/entities/collection';
import { cn } from '@/shared/utils/cn';

interface CollectionTabsProps {
  selectedId: CollectionTabId;
  onSelect: (id: CollectionTabId) => void;
}

export const CollectionTabs = ({
  selectedId,
  onSelect,
}: CollectionTabsProps) => {
  const selectedIndex = COLLECTION_TABS.findIndex(
    (tab) => tab.id === selectedId,
  );

  return (
    <div className="relative mt-5 border-b border-gray-200">
      <ul className="flex">
        {COLLECTION_TABS.map((tab: CollectionTab) => (
          <li key={tab.id} className="flex-1">
            <button
              onClick={() => onSelect(tab.id)}
              className={cn(
                'w-full py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300',
                selectedId === tab.id ? 'text-green-600' : 'text-gray-600',
              )}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <div
        className="absolute bottom-0 h-0.5 bg-green-500 transition-transform duration-300 ease-out"
        style={{
          width: `${100 / COLLECTION_TABS.length}%`,
          transform: `translateX(${selectedIndex * 100}%)`,
        }}
      />
    </div>
  );
};
