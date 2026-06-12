import { Collection, CollectionBox } from '@/entities/collection';

interface CollectionGridProps {
  collections: Collection[];
}

export const CollectionGrid = ({ collections }: CollectionGridProps) => {
  return (
    <div className="mt-5 grid grid-cols-3 gap-4 pb-4">
      {collections.map((collection) => (
        <CollectionBox key={collection.id} {...collection} />
      ))}
    </div>
  );
};
