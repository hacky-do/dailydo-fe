'use client';

import { useState } from 'react';

import { CollectionTabId } from '@/entities/collection';
import { useGetUserCollection } from '@/entities/collection';
import { RepresentativeCollection } from '@/features/representative-collection';
import { FallbackUI } from '@/shared/ui/fallback-ui';
import { CollectionGrid, CollectionTabs } from '@/widgets/collections';

export default function CollectionPage() {
  const [collectionsTab, setCollectionsTab] = useState<CollectionTabId>('all');

  const {
    data: userCollection,
    isError,
    refetch,
    isPending,
  } = useGetUserCollection();

  if (isError) {
    return <FallbackUI onReset={refetch} />;
  }

  return (
    <div className="mt-5 flex h-full flex-col items-center justify-center">
      <RepresentativeCollection
        userCollection={userCollection}
        isPending={isPending}
      />
      <ul className="mt-13 flex w-full flex-1 flex-col gap-5 rounded-t-4xl bg-white px-4">
        <CollectionTabs
          selectedId={collectionsTab}
          onSelect={setCollectionsTab}
        />

        <CollectionGrid
          userCollectionId={userCollection?.id}
          collectionsTab={collectionsTab}
        />
      </ul>
    </div>
  );
}
