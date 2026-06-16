'use client';

import { useState } from 'react';

import { MOCK_COLLECTIONS } from '@/entities/collection';
import { RepresentativeCollection } from '@/features/representative-collection';
import { CollectionGrid, CollectionTabs } from '@/widgets/collections';

export default function CollectionPage() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <RepresentativeCollection
        imageSrc="/mocks/images/test_image.png"
        title="무지개를 손에 넣는 자"
      />

      <div className="mt-9 w-full flex-1 rounded-t-4xl bg-white">
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
