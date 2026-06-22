import type { CollectionItem, CollectionTabId } from '@/entities/collection';
import {
  CollectionBox,
  CollectionSkeleton,
  useGetCollections,
} from '@/entities/collection';

const SKELETON_COUNT = 9;

const filterByTab: Record<
  CollectionTabId,
  (items: CollectionItem[]) => CollectionItem[]
> = {
  all: (items) => items,
  completed: (items) => items.filter((c) => c.completed),
  incomplete: (items) => items.filter((c) => !c.completed),
};

interface CollectionGridProps {
  userCollectionId?: string;
  collectionsTab: CollectionTabId;
}

export const CollectionGrid = ({
  userCollectionId,
  collectionsTab,
}: CollectionGridProps) => {
  const { data: collectionsData, isPending } = useGetCollections();
  const allItems = collectionsData?.collections ?? [];
  const filteredItems = filterByTab[collectionsTab](allItems);

  return (
    <ul className="grid max-h-[calc(100vh-345px)] flex-1 grid-cols-3 grid-rows-[min-content] gap-5 overflow-auto pb-4">
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
