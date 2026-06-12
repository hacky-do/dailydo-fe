'use client';

import { MOCK_COLLECTIONS } from '@/entities/collection';
import {
  CollectionGrid,
  CollectionTabs,
  useCollectionTab,
} from '@/features/collections';
import { RepresentativeCollection } from '@/widgets/representative-collection';

export default function CollectionPage() {
  const { selectedId, setSelectedId } = useCollectionTab();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <RepresentativeCollection title="무지개를 손에 넣는 자" />

      <div className="mt-9 w-full flex-1 rounded-t-2xl bg-white">
        <div className="px-4">
          <div className="mt-5">
            <CollectionTabs selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <CollectionGrid collections={MOCK_COLLECTIONS} />
        </div>
      </div>
    </div>
  );
}
