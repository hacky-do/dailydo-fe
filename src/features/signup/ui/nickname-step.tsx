'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import {
  NICKNAME_HELPER_TEXT,
  validateNickname,
} from '../lib/validate-nickname';

export const NICKNAME_FORM_ID = 'nickname-step-form';

interface NicknameStepProps {
  defaultValue?: string;
  onNext: (nickname: string) => void;
  onValidChange?: (isValid: boolean) => void;
}

interface NicknameFormValues {
  nickname: string;
}

export const NicknameStep = ({
  defaultValue = '',
  onNext,
  onValidChange,
}: NicknameStepProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<NicknameFormValues>({
    mode: 'onChange',
    defaultValues: { nickname: defaultValue },
  });

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  return (
    <form
      id={NICKNAME_FORM_ID}
      onSubmit={handleSubmit(({ nickname }) => onNext(nickname))}
      className="flex flex-col gap-9 px-8 pt-9"
    >
      <h1 className="text-2xl leading-8 font-semibold tracking-tight text-gray-800">
        데일리두에서 사용할
        <br />
        닉네임을 입력해주세요.
      </h1>
      <Controller
        name="nickname"
        control={control}
        rules={{ validate: validateNickname }}
        render={({ field, fieldState }) => (
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
        )}
      />
    </form>
  );
};
