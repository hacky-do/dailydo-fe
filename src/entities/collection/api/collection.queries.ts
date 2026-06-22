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
    retry: false,
  });

export const usePostUserCollection = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => postUserCollection(collectionId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: collectionQueryKeys.userCollection,
        }),
        queryClient.invalidateQueries({
          queryKey: collectionQueryKeys.collections,
        }),
      ]);
      options?.onSuccess?.();
    },
  });
};

export const useDeleteUserCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => deleteUserCollection(collectionId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: collectionQueryKeys.userCollection,
      });
      const previousUserCollection = queryClient.getQueryData(
        collectionQueryKeys.userCollection,
      );
      queryClient.setQueryData(collectionQueryKeys.userCollection, null);
      return { previousUserCollection };
    },
    onError: (_err, _collectionId, context) => {
      queryClient.setQueryData(
        collectionQueryKeys.userCollection,
        context?.previousUserCollection,
      );
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: collectionQueryKeys.userCollection,
        }),
        queryClient.invalidateQueries({
          queryKey: collectionQueryKeys.collections,
        }),
      ]);
    },
  });
};
