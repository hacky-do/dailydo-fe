import { CollectionBox } from '@/entities/collection';
import { CollectionItem } from '@/entities/collection/model/collection.types';

interface CollectionGridProps {
  items?: CollectionItem[];
  userCollectionId?: string;
}

export const CollectionGrid = ({
  items,
  userCollectionId,
}: CollectionGridProps) => {
  return (
    <div className="grid max-h-[calc(100vh-345px)] flex-1 grid-cols-3 gap-4 overflow-auto pb-4">
      {items?.map((collection) => (
        <CollectionBox
          key={collection.collectionId}
          id={collection.collectionId}
          src={collection.image}
          title={collection.title}
          description={collection.description}
          requirements={collection.requirements}
          completed={collection.completed}
          isRepresentative={userCollectionId === collection.collectionId}
        />
      ))}
    </div>
  );
};
