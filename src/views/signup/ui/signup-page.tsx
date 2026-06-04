'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { CategorySelect } from '@/features/category-select';
import {
  CategoryStep,
  MIN_CATEGORY_COUNT,
  NicknameStep,
  SignupFormValues,
  useSignupFlow,
  WelcomeStep,
} from '@/features/signup';
import { useSignup } from '@/features/signup/model/use-signup';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/ui/toast/use-toast';

const contentVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

const actionVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const SignupPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: signup, isPending } = useSignup();

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: 'onChange',
    defaultValues: { nickname: '', categoryIds: [], agreeMarketing: false },
  });

  const nickname = useWatch({ control, name: 'nickname', defaultValue: '' });
  const categoryIds = useWatch({
    control,
    name: 'categoryIds',
    defaultValue: [],
  });

  const agreeMarketing = useWatch({
    control,
    name: 'agreeMarketing',
    defaultValue: false,
  });

  const {
    step,
    socialToken,
    email,
    type,
    goToCategory,
    goToPrev,
    goToWelcome,
  } = useSignupFlow({ nickname, categoryIds });

  const handleNicknameNext = async () => {
    const valid = await trigger('nickname');
    if (valid) goToCategory();
  };

  const handleStart = () => {
    signup(
      { email, name: nickname, agreeMarketing, type, socialToken },
      {
        onSuccess: () => {
          toast({
            type: 'success',
            message: '환영해요! 오늘의 미션을 시작해볼까요?',
          });
          router.replace(ROUTES.MISSIONS);
        },
        onError: () => {
          toast({ type: 'error', message: '가입에 실패했습니다' });
        },
      },
    );
  };

  const isNicknameValid = !!nickname && !errors.nickname;

  return (
    <div className="bg-gradient-100 relative flex h-full min-h-dvh flex-col">
      <div className="h-10" aria-hidden="true" />
      <div className="flex h-full flex-1 flex-col gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-1 flex-col"
          >
            {step === 'nickname' && <NicknameStep control={control} />}
            {step === 'category' && (
              <CategoryStep>
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <CategorySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </CategoryStep>
            )}
            {step === 'welcome' && <WelcomeStep nickname={nickname} />}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step + '_action'}
            variants={actionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="mt-auto shrink-0 px-8 pb-9.5"
          >
            {step === 'nickname' && (
              <Button onClick={handleNicknameNext} disabled={!isNicknameValid}>
                다음
              </Button>
            )}
            {step === 'category' && (
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={goToPrev}
                  className="flex-1"
                >
                  이전
                </Button>
                <Button
                  onClick={goToWelcome}
                  disabled={categoryIds.length < MIN_CATEGORY_COUNT}
                  className="flex-1"
                >
                  다음
                </Button>
              </div>
            )}
            {step === 'welcome' && (
              <Button onClick={handleStart} isLoading={isPending}>
                시작하기
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
