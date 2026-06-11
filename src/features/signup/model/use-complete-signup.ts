import { useMutation } from '@tanstack/react-query';

import { addUserCategory, updateUserProfile } from '../api/signup.api';

interface CompleteSignupParams {
  name: string;
  agreeMarketing: boolean;
  categoryIds: number[];
}

export const useCompleteSignup = () =>
  useMutation({
    mutationFn: async ({
      name,
      agreeMarketing,
      categoryIds,
    }: CompleteSignupParams) => {
      await updateUserProfile({ name, agreeMarketing });
      await Promise.all(
        categoryIds.map((categoryId) => addUserCategory({ categoryId })),
      );
    },
  });
