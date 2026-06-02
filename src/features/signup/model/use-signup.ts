import { useMutation } from '@tanstack/react-query';

import { signup } from '../api/signup.api';

interface SignupParams {
  nickname: string;
  category: number[];
}

export const useSignup = () =>
  useMutation({
    mutationFn: (params: SignupParams) => signup(params),
  });
