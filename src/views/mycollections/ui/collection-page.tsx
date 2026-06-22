'use client';

import { useState } from 'react';

import { useGetUserCollection } from '@/entities/collection/api/collection.queries';
import { RepresentativeCollection } from '@/features/representative-collection';
import { FallbackUI } from '@/shared/ui/fallback-ui';
import { CollectionGrid, CollectionTabs } from '@/widgets/collections';

export type CollectionTabId = 'all' | 'completed' | 'incomplete';

export default function CollectionPage() {
  const [collectionsTab, setCollectionsTab] = useState<CollectionTabId>('all');

  const { data: userCollections, isError, refetch } = useGetUserCollection();

  if (isError) {
    return <FallbackUI onReset={refetch} />;
  }

  return (
    <div className="mt-5 flex h-full flex-col items-center justify-center">
      <RepresentativeCollection
        userCollections={userCollections}
        defaultImage="/mocks/images/test_image.png"
        defaultTitle="대표 컬렉션이 설정되지 않았어요"
      />
      <ul className="mt-9 flex w-full flex-1 flex-col gap-5 rounded-t-4xl bg-white px-4">
        <CollectionTabs
          selectedId={collectionsTab}
          onSelect={setCollectionsTab}
        />

        <CollectionGrid
          userCollectionId={userCollections?.id}
          collectionsTab={collectionsTab}
        />
      </ul>
    </div>
  );
}
