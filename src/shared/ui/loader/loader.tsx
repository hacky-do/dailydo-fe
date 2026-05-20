'use client';

import { BeatLoader } from 'react-spinners';

type LoaderColor = 'primary' | 'secondary' | 'tertiary';

const colorMap: Record<LoaderColor, string> = {
  primary: 'var(--color-green-500)',
  secondary: 'var(--color-green-400)',
  tertiary: 'var(--color-gray-400)',
};

interface LoaderProps {
  color?: LoaderColor;
  size?: 'sm' | 'lg';
}

export const Loader = ({ color = 'primary', size = 'lg' }: LoaderProps) => {
  return (
    <BeatLoader
      size={size === 'lg' ? 10 : 8}
      margin={2}
      speedMultiplier={0.8}
      color={colorMap[color]}
    />
  );
};
