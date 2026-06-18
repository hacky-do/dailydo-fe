'use client';

import EmptyStateImg from '@/shared/ui/icons/common/empty_state.svg';

import { Button } from '../button';

interface FallbackUIProps {
  message?: string;
  onReset?: () => void;
}

// onReset을 생략 시, 버튼이 표시X
export const FallbackUI = ({
  message = '페이지를 불러오는 중 문제가 생겼어요.\n잠시 후 다시 시도해 주세요.',
  onReset,
}: FallbackUIProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <EmptyStateImg width="120px" />
      <p className="text-center text-base tracking-tight whitespace-pre-line text-gray-800">
        {message}
      </p>
      {onReset && (
        <Button variant="tertiary" size="md" onClick={onReset}>
          다시시도
        </Button>
      )}
    </div>
  );
};
