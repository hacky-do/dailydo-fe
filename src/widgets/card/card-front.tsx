'use client';

import { cn } from '@/shared/utils/cn';

import { cardBgStyles, getCardVariant } from './card.styles';
import { useCard } from './card-context';

// 클릭 시 화면 전환
export const CardFront = ({ children }: { children?: React.ReactNode }) => {
  const { flipped, isSpecial, isCompleted } = useCard();
  const variant = getCardVariant(isSpecial, isCompleted);

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden rounded-2xl transition-all duration-500 backface-hidden',
        cardBgStyles[variant],
        flipped && 'pointer-events-none',
      )}
    >
      {children}
    </div>
  );
};
