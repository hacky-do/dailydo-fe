import { CollectionBox, CollectionSkeleton } from '@/entities/collection';
import { useGetCollections } from '@/entities/collection/api/collection.queries';

const SKELETON_COUNT = 9;

interface CollectionGridProps {
  userCollectionId?: string;
  collectionsTab: number;
}

export const CollectionGrid = ({
  userCollectionId,
  collectionsTab,
}: CollectionGridProps) => {
  const { data: collectionsData, isPending } = useGetCollections();
  const allItems = collectionsData?.collections ?? [];
  const filteredItems =
    collectionsTab === 2
      ? allItems.filter((c) => c.completed)
      : collectionsTab === 3
        ? allItems.filter((c) => !c.completed)
        : allItems;

  return (
    <ul className="grid max-h-[calc(100vh-345px)] flex-1 grid-cols-3 gap-4 overflow-auto pb-4">
      {isPending
        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CollectionSkeleton key={i} />
          ))
        : filteredItems.map((collection) => (
            <CollectionBox
              key={collection.collectionId}
              id={collection.collectionId}
              src={collection.image}
              title={collection.title}
              description={collection.description}
              requirements={collection.requirements}
              completed={collection.completed}
              isRepresentative={userCollectionId === collection.collectionId}
              acquisitionRate={collection.acquisitionRate}
            />
          ))}
    </ul>
  );
};
