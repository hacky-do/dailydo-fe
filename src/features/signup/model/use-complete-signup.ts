import { useMutation } from '@tanstack/react-query';

import { addUserCategory, updateUserProfile } from '../api/signup.api';

interface CompleteSignupParams {
  name: string;
  agreeMarketing: boolean;
  categoryIds: number[];
}

// 가입 직후 입력한 닉네임·마케팅동의는 프로필로, 선택한 카테고리는 순서대로 저장한다
export const useCompleteSignup = () =>
  useMutation({
    mutationFn: async ({
      name,
      agreeMarketing,
      categoryIds,
    }: CompleteSignupParams) => {
      await updateUserProfile({ name, agreeMarketing });
      await Promise.all(
        categoryIds.map((categoryId, index) =>
          addUserCategory({ categoryId, sortOrder: index }),
        ),
      );
    },
  });
