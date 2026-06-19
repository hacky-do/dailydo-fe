import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { collectionQueryKeys } from '../model/collection.constants';
import {
  deleteUserCollection,
  getCollections,
  getUserCollection,
  postUserCollection,
} from './collection.api';

export const useGetCollections = () =>
  useQuery({
    queryKey: collectionQueryKeys.collections,
    queryFn: getCollections,
    gcTime: 0,
    staleTime: 0,
  });

export const useGetUserCollection = () =>
  useQuery({
    queryKey: collectionQueryKeys.userCollection,
    queryFn: getUserCollection,
    gcTime: 0,
    staleTime: 0,
  });

export const usePostUserCollection = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => postUserCollection(collectionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: collectionQueryKeys.userCollection,
      });
      options?.onSuccess?.();
    },
  });
};

export const useDeleteUserCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => deleteUserCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionQueryKeys.userCollection,
      });
    },
  });
};
