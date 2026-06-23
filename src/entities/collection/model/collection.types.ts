export interface Collection {
  id: string;
  src: string;
  title: string;
  type?: 'NORMAL' | 'SPECIAL';
  description: string;
  acquisitionRate?: number;
  requirements: {
    missionId: number;
    title: string;
    count: number;
  }[];
}

export interface CollectionTab {
  id: 'all' | 'completed' | 'incomplete';
  title: string;
}

export interface UserCollection {
  id: string;
  image: string;
  description: string;
  title: string;
  type?: 'NORMAL' | 'SPECIAL';
}

export interface CollectionItem {
  collectionId: string;
  image: string;
  title: string;
  completed: boolean;
  type?: 'NORMAL' | 'SPECIAL';
  description: string;
  acquisitionRate: number;
  requirements: {
    missionId: number;
    title: string;
    count: number;
  }[];
}

export type CollectionTabId = 'all' | 'completed' | 'incomplete';

export interface Collections {
  collections: CollectionItem[];
}
