import { useQuery } from '@tanstack/react-query';

import { missionsQueryKey } from './mission.constans';
import { getMissions } from './mission.querys';

export const useMissions = () =>
  useQuery({
    queryKey: missionsQueryKey,
    queryFn: getMissions,
  });
