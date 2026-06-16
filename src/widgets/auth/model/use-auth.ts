import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';

import { emailLogout, getSession } from '../api/auth.api';
import { authQueryKeys } from './auth.constants';

export const useAuth = () =>
  useQuery({
    queryKey: authQueryKeys.session,
    queryFn: getSession,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: emailLogout,
    onSuccess: () => {
      queryClient.clear();
      router.push(ROUTES.HOME);
    },
  });
};
