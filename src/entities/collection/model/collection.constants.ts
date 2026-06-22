import { CollectionTab } from './collection.types';

export const COLLECTION_TABS: CollectionTab[] = [
  { id: 1, title: '전체보기' },
  { id: 2, title: '획득한 컬렉션' },
  { id: 3, title: '미획득한 컬렉션' },
];

export const collectionQueryKeys = {
  collections: ['collections'],
  userCollection: ['user-collection'],
} as const;
