'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CategorySelect } from '@/features/category-select';
import {
  CategoryStep,
  MIN_CATEGORY_COUNT,
  NICKNAME_FORM_ID,
  NicknameStep,
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
    step,
    nickname,
    categoryIds,
    setCategoryIds,
    goToCategory,
    goToPrev,
    goToWelcome,
  } = useSignupFlow();

  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const handleStart = () => {
    signup(
      { nickname, category: categoryIds },
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

  return (
    <div className="bg-gradient-100 flex h-dvh flex-col overflow-hidden">
      {/* TODO: 공통 GNB 컴포넌트 연결 */}
      <header
        className="h-14 shrink-0 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.04)]"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex flex-1 flex-col overflow-hidden"
        >
          {step === 'nickname' && (
            <NicknameStep
              defaultValue={nickname}
              onNext={goToCategory}
              onValidChange={setIsNicknameValid}
            />
          )}
          {step === 'category' && (
            <CategoryStep>
              <CategorySelect value={categoryIds} onChange={setCategoryIds} />
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
          className="shrink-0 px-8 pb-9.5"
        >
          {step === 'nickname' && (
            <Button
              type="submit"
              form={NICKNAME_FORM_ID}
              disabled={!isNicknameValid}
            >
              다음
            </Button>
          )}
          {step === 'category' && (
            <div className="flex gap-4">
              <Button variant="secondary" onClick={goToPrev} className="flex-1">
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
  );
};
