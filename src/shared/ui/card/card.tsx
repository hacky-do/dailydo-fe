'use client';

import { useState } from 'react';

import { CardBack } from './card.back';
import { CardContext } from './card.context';
import { CardFront } from './card.front';

interface CardRootProps {
  children: React.ReactNode;
  isSpecial?: boolean;
  isCompleted?: boolean;
  defaultFlipped?: boolean;
  onFlip?: () => void;
}

const CardRoot = ({
  children,
  isSpecial = false,
  isCompleted = false,
  defaultFlipped = false,
  onFlip,
}: CardRootProps) => {
  const [flipped, setFlipped] = useState(defaultFlipped);

  const handleFlip = () => {
    setFlipped(true);
    onFlip?.();
  };

  const handleUnflip = () => {
    setFlipped(false);
  };

  return (
    <CardContext.Provider
      value={{
        flipped,
        isSpecial,
        isCompleted,
        onFlip: handleFlip,
        onUnflip: handleUnflip,
      }}
    >
      <div
        className="relative h-full min-h-82 w-56.25 min-w-56.25 cursor-pointer perspective-midrange"
        onClick={handleFlip}
        role="button"
        tabIndex={-1}
      >
        <div
          data-flipped={flipped}
          className={`shadow-card absolute inset-0 rounded-2xl transition-transform duration-500 transform-3d ${flipped ? 'transform-[rotateY(180deg)]' : ''}`}
        >
          {children}
        </div>
      </div>
    </CardContext.Provider>
  );
};

export const Card = Object.assign(CardRoot, {
  Front: CardFront,
  Back: CardBack,
});
