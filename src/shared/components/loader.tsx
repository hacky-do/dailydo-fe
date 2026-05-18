'use client';

import { SyncLoader } from 'react-spinners';

type LoaderVariant = 'primary' | 'secondary' | 'ghost';

const colorMap: Record<LoaderVariant, string> = {
  primary: 'var(--color-green-500)',
  secondary: 'var(--color-green-400)',
  ghost: 'var(--color-gray-400)',
};

interface LoaderProps {
  variant?: LoaderVariant;
  size?: 'sm' | 'lg';
}

export const Loader = ({ variant = 'primary', size = 'lg' }: LoaderProps) => {
  return (
    <SyncLoader
      size={size === 'lg' ? 10 : 8}
      margin={2}
      speedMultiplier={0.8}
      color={colorMap[variant]}
    />
  );
};
