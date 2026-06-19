import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { collectionQueryKeys } from '../model/collection.constants';
import {
  deleteUserCollections,
  getCollections,
  getUserCollection,
  postUserCollections,
} from './collection.api';

export const useGetCollection = () =>
  useQuery({
    queryKey: collectionQueryKeys.collections,
    queryFn: getCollections,
    gcTime: 0,
    staleTime: 0,
  });

export const useGetUserCollections = () =>
  useQuery({
    queryKey: collectionQueryKeys.userCollection,
    queryFn: getUserCollection,
    gcTime: 0,
    staleTime: 0,
  });

export const usePostUserCollections = (options?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => postUserCollections(collectionId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: collectionQueryKeys.userCollection,
      });
      options?.onSuccess?.();
    },
  });
};

export const useDeleteCompleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) => deleteUserCollections(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionQueryKeys.userCollection,
      });
    },
  });
};
