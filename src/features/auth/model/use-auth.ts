import { useQuery } from '@tanstack/react-query';

import { getSession } from '../api/auth.api';
import { authQueryKeys } from './auth.constants';

export const useAuth = () =>
  useQuery({
    queryKey: authQueryKeys.session,
    queryFn: getSession,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
