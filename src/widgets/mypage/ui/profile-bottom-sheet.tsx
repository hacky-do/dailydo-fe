'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useFileUpload } from '@/entities/file/api/file.queries';
import { NICKNAME_HELPER_TEXT, type User } from '@/entities/user';
import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button';
import { FileInput, useFileInput } from '@/shared/ui/file-input';
import { Input } from '@/shared/ui/input/input';
import { Textarea } from '@/shared/ui/input/textarea';
import { useToast } from '@/shared/ui/toast';

import {
  ProfileEditFormValues,
  profileEditSchema,
} from '../lib/profile-edit-schema';

interface ProfileBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: Pick<User, 'name' | 'description' | 'profileImage'>;
  onSubmit: (
    values: ProfileEditFormValues,
    profileImageUrl: string | null | undefined,
  ) => void;
  isLoading?: boolean;
}

interface ProfileEditFormContentProps {
  defaultValues: Pick<User, 'name' | 'description' | 'profileImage'>;
  onSubmit: (
    values: ProfileEditFormValues,
    profileImageUrl: string | null | undefined,
  ) => void;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

const ProfileEditFormContent = ({
  defaultValues,
  onSubmit,
  onOpenChange,
  isLoading,
}: ProfileEditFormContentProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onChange',
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description ?? '',
    },
  });

  const { name: nameValue, description } = useWatch({ control });

  const { file, handleChange } = useFileInput();
  const [profileImageChanged, setProfileImageChanged] = useState(false);
  const isFormDirty = isDirty || profileImageChanged;

  const { mutateAsync: upload, isPending: isUploading } = useFileUpload();
  const { toast } = useToast();

  const handleImageChange = (f: File | null) => {
    handleChange(f);
    setProfileImageChanged(true);
  };

  const handleFormSubmit = async (values: ProfileEditFormValues) => {
    try {
      let profileImageUrl: string | null | undefined = undefined;
      if (profileImageChanged) {
        profileImageUrl = file ? await upload(file) : null;
      }
      onSubmit(values, profileImageUrl);
    } catch {
      toast({
        type: 'error',
        message: '이미지 업로드에 실패했어요. 다시 시도해주세요.',
      });
    }
  };

  const isSubmitLoading = isUploading || isLoading;

  return (
    <>
      <BottomSheet.Body className="relative flex flex-col gap-12 pt-4 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-800">
            프로필 사진을 등록해주세요.
          </p>
          <FileInput
            initialSrc={defaultValues.profileImage}
            onChange={handleImageChange}
          />
        </div>
        <Input
          id="profile-name"
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          isError={!!errors.name}
          description={NICKNAME_HELPER_TEXT}
          {...register('name')}
        />
        <Textarea
          id="profile-description"
          label="나의 소개"
          placeholder="최대 100자까지 입력 가능해요."
          description={`${(description ?? '').length}/100자`}
          maxLength={100}
          {...register('description')}
        />
      </BottomSheet.Body>
      <BottomSheet.Footer className="flex gap-3">
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          취소하기
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={handleSubmit(handleFormSubmit)}
          isLoading={isSubmitLoading}
          disabled={!isFormDirty || !!errors.name || !nameValue}
        >
          완료하기
        </Button>
      </BottomSheet.Footer>
    </>
  );
};

export const ProfileBottomSheet = ({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  isLoading = false,
}: ProfileBottomSheetProps) => (
  <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
    <BottomSheet.Content>
      <BottomSheet.Header>
        <BottomSheet.Title>프로필 수정</BottomSheet.Title>
      </BottomSheet.Header>
      <ProfileEditFormContent
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onOpenChange={onOpenChange}
        isLoading={isLoading}
      />
    </BottomSheet.Content>
  </BottomSheet.Root>
);
