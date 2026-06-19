'use client';

import { useState } from 'react';

import {
  useGetCollection,
  useGetUserCollections,
} from '@/entities/collection/api/collection.queries';
import { RepresentativeCollection } from '@/features/representative-collection';
import { CollectionGrid, CollectionTabs } from '@/widgets/collections';

export default function CollectionPage() {
  const [collectionsTab, setCollectionsTab] = useState(1);

  const { data: collectionsData } = useGetCollection();
  const { data: userCollections } = useGetUserCollections();

  const allItems = collectionsData?.collections ?? [];
  const filteredItems =
    collectionsTab === 2
      ? allItems.filter((c) => c.completed)
      : collectionsTab === 3
        ? allItems.filter((c) => !c.completed)
        : allItems;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <RepresentativeCollection
        userCollections={userCollections}
        defaultImage="/mocks/images/test_image.png"
        defaultTitle="대표 컬렉션이 설정되지 않았어요"
      />
      <div className="mt-9 w-full flex-1 rounded-t-4xl bg-white">
        <div className="px-4">
          <div className="mt-5">
            <CollectionTabs
              selectedId={collectionsTab}
              onSelect={setCollectionsTab}
            />
          </div>
          <CollectionGrid items={filteredItems} />
        </div>
      </div>
    </div>
  );
}
