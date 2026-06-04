'use client';

import { Control, useController } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import {
  NICKNAME_HELPER_TEXT,
  validateNickname,
} from '../lib/validate-nickname';
import { SignupFormValues } from '../model/signup-form-values';

interface NicknameStepProps {
  control: Control<SignupFormValues>;
}

export const NicknameStep = ({ control }: NicknameStepProps) => {
  const { field, fieldState } = useController({
    name: 'nickname',
    control,
    rules: { validate: validateNickname },
  });

  const { field: marketingField } = useController({
    name: 'agreeMarketing',
    control,
  });

  return (
    <div className="flex flex-col gap-9 px-8 pt-9">
      <h1 className="text-2xl leading-8 font-semibold tracking-tight text-gray-800">
        데일리두에서 사용할
        <br />
        닉네임을 입력해주세요.
      </h1>
      <Input
        id="nickname"
        label="닉네임"
        hideLabel
        placeholder="닉네임을 입력해주세요"
        description={NICKNAME_HELPER_TEXT}
        isError={!!fieldState.error}
        maxLength={8}
        autoComplete="off"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={marketingField.value}
          onChange={marketingField.onChange}
          onBlur={marketingField.onBlur}
        />
        마케팅 정보 수신에 동의합니다 (선택)
      </label>
    </div>
  );
};
