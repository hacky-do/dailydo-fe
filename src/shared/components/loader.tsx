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
}

export const Loader = ({ variant = 'primary' }: LoaderProps) => {
  return (
    <SyncLoader
      size={10}
      margin={2}
      speedMultiplier={0.8}
      color={colorMap[variant]}
    />
  );
};
