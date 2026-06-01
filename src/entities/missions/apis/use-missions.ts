import { useQuery } from '@tanstack/react-query';

import { getMissions } from './mission.api';
import { missionsQueryKey } from './mission.constans';

export const useMissions = () =>
  useQuery({
    queryKey: missionsQueryKey,
    queryFn: getMissions,
  });
