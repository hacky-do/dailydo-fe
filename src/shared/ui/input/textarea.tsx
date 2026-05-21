import { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface TextareaProps extends ComponentProps<'textarea'> {
  description?: string;
  resizable?: boolean;
}

export const Textarea = ({
  description,
  className,
  resizable = false,
  ...props
}: TextareaProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <textarea
        className={cn(
          'h-30 w-full rounded-xl bg-gray-50 p-3 text-sm font-normal placeholder:text-gray-500',
          resizable ? 'resize-y' : 'resize-none',
          className,
        )}
        {...props}
      />
      {description && (
        <p className="ml-auto px-1 text-xs font-medium text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};
