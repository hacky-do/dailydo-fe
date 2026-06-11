import { useMutation } from '@tanstack/react-query';

import { register, RegisterParams } from '../api/auth.api';

export const useRegister = () =>
  useMutation({
    mutationFn: (params: RegisterParams) => register(params),
  });
