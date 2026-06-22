import { CollectionTab } from './collection.types';

export const COLLECTION_TABS: CollectionTab[] = [
  { id: 'all', title: '전체보기' },
  { id: 'completed', title: '획득한 컬렉션' },
  { id: 'incomplete', title: '미획득한 컬렉션' },
];

export const collectionQueryKeys = {
  collections: ['collections'],
  userCollection: ['user-collection'],
} as const;
