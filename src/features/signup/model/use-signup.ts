import { useMutation } from '@tanstack/react-query';

import { signup, SignupParams } from '../api/signup.api';

export const useSignup = () =>
  useMutation({
    mutationFn: (params: SignupParams) => signup(params),
  });
