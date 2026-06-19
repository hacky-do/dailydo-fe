import { clientApi } from '@/shared/api/fetch-client';

import { Collections, UserCollection } from '../model/collection.types';

export const getCollections = () =>
  clientApi.get<Collections>('/api/users/collections');

export const getUserCollection = () =>
  clientApi.get<UserCollection>('/api/users/me/collections/featured');

export const postUserCollections = (collectionId: string) =>
  clientApi.post('/api/users/me/collections/featured', {
    body: JSON.stringify({ collectionId }),
  });

export const deleteUserCollections = (collectionId: string) =>
  clientApi.delete(`/api/users/me/collections/featured`, {
    body: JSON.stringify({ collectionId }),
  });
