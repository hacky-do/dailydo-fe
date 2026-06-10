import { useSuspenseQuery } from '@tanstack/react-query';

import { userQueryKeys } from '../model/user.constants';
import { getMe } from './user.api';

export const useGetMe = () =>
  useSuspenseQuery({
    queryKey: userQueryKeys.me,
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
