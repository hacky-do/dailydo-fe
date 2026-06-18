'use client';

import EmptyStateImg from '@/shared/ui/icons/common/empty_state.svg';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({
  message = '조회된 내용이 없어요.',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <EmptyStateImg width="120px" />
      <p className="text-center text-base tracking-tight whitespace-pre-line text-gray-800">
        {message}
      </p>
    </div>
  );
};
