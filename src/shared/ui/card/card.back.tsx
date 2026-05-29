'use client';

import { cn } from '@/shared/utils/cn';

import { useCard } from './card.context';
import { cardBgStyles, getCardBorderStyle, getCardVariant } from './card.styles';

interface CardBackProps {
  children?: React.ReactNode;
  selected?: boolean;
}

//  미션 확인 화면
export const CardBack = ({ children, selected = false }: CardBackProps) => {
  const { isCompleted, isSpecial } = useCard();
  const variant = getCardVariant(isSpecial, isCompleted);

  return (
    <div
      className={cn(
        'shadow-card absolute inset-0 flex transform-[rotateY(180deg)] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-6 backface-hidden',
        getCardBorderStyle(selected, isSpecial),
      )}
    >
      {isCompleted && (
        <div className={cn('animate-card-fill-up absolute inset-0', cardBgStyles[variant])} />
      )}
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-3">
        {children}
      </div>
    </div>
  );
};
