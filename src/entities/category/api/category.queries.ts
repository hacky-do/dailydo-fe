import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userQueryKeys } from '@/entities/user/model/user.constants';

import { categoryQueryKeys } from '../model/category.constants';
import { getMissionCategories } from './category.api';
import { putUserCategories } from './category.api';

export const useGetMissionCategories = () =>
  useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: () => getMissionCategories(0, 10),
    select: (res) => res.data.filter((c) => c.name !== '스페셜'),
    staleTime: Infinity,
  });

export const usePutUserCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryIds: number[]) => putUserCategories({ categoryIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.me });
    },
  });
};
