export interface Collection {
  id: string;
  src: string;
  title: string;
  description: string;
  acquisitionRate?: number;
  requirements: {
    missionId: number;
    title: string;
    count: number;
  }[];
}

export interface UserCollection {
  id: string;
  image: string;
  description: string;
  title: string;
}

export interface CollectionTab {
  id: number;
  title: string;
}

export interface CollectionItem {
  collectionId: string;
  image: string;
  title: string;
  completed: boolean;
  description: string;
  acquisitionRate: number;
  requirements: {
    missionId: number;
    title: string;
    count: number;
  }[];
}

export interface Collections {
  collections: CollectionItem[];
}
