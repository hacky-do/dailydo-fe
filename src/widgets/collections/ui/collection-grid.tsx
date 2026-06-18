import { CollectionBox } from '@/entities/collection';
import { CollectionItem } from '@/entities/collection/model/collection.types';

interface CollectionGridProps {
  items?: CollectionItem[];
}

export const CollectionGrid = ({ items }: CollectionGridProps) => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 pb-4">
      {items?.map((collection) => (
        <CollectionBox
          key={collection.collectionId}
          id={collection.collectionId}
          src={collection.image}
          title={collection.title}
        />
      ))}
    </div>
  );
};
