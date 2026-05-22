import { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  variant?: 'sm' | 'lg';
  description?: string;
  isError?: boolean;
  id: string;
}

export const Input = ({
  className,
  variant = 'lg',
  isError,
  description,
  id,
  ...props
}: InputProps) => {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <input
        className={cn(
          'w-full bg-gray-50 text-sm font-normal placeholder:text-gray-500',
          {
            'rounded-[10px] px-3 py-2.5': variant === 'sm',
            'rounded-xl p-3': variant === 'lg',
            'border-error border': isError,
          },
          className,
        )}
        aria-invalid={isError}
        aria-describedby={descriptionId}
        aria-errormessage={isError ? descriptionId : undefined}
        id={id}
        {...props}
      />
      {description && (
        <p
          id={descriptionId}
          className={cn('px-1 text-xs font-medium', {
            'text-gray-500': !isError,
            'text-error': isError,
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
};
