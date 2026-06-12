import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userQueryKeys } from '../model/user.constants';
import { PatchMeRequest } from '../model/user.types';
import { getMe, patchMe } from './user.api';

export const useGetMe = () =>
  useQuery({
    queryKey: userQueryKeys.me,
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const usePatchMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: PatchMeRequest) => patchMe(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.me });
    },
  });
};
