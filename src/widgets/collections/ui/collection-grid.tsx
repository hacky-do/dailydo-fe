import type { CollectionItem, CollectionTabId } from '@/entities/collection';
import {
  CollectionBox,
  CollectionSkeleton,
  useGetCollections,
} from '@/entities/collection';
import { EmptyState } from '@/shared/ui/empty-state';
import { FallbackUI } from '@/shared/ui/fallback-ui';

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
  const {
    data: collectionsData,
    isPending,
    isError,
    refetch,
  } = useGetCollections();
  const allItems = collectionsData?.collections ?? [];
  const filteredItems = filterByTab[collectionsTab](allItems);

  if (!isPending && filteredItems.length === 0) {
    const emptyMessage =
      collectionsTab === 'completed'
        ? '아직 획득한 컬렉션이 없어요.'
        : collectionsTab === 'incomplete'
          ? '모든 컬렉션을 획득 했어요.'
          : '컬렉션이 없어요.';
    return <EmptyState message={emptyMessage} />;
  }

  if (isError) {
    return <FallbackUI onReset={refetch} />;
  }
  return (
    <ul className="grid max-h-[calc(100vh-345px)] flex-1 grid-cols-3 content-start gap-5 overflow-auto pb-4">
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
