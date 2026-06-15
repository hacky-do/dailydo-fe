import { useSuspenseQuery } from '@tanstack/react-query';

import { categoryQueryKeys } from '../model/category.constants';
import { getMissionCategories } from './category.api';

export const useGetMissionCategories = () =>
  useSuspenseQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: () => getMissionCategories(0, 10),
    select: (res) => res.data,
    staleTime: Infinity,
  });
