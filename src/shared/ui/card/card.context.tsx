'use client';

import { createContext, useContext } from 'react';

import { CardContextProps } from '@/entities/card/model/card.types';

export const CardContext = createContext<CardContextProps | null>(null);

export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error('Card.* 는 <Card> 안에서 사용해야 합니다.');
  return context;
}
