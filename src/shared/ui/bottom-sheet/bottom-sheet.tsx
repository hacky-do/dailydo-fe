'use client';

import { ComponentProps } from 'react';
import { Drawer } from 'vaul';

import DeleteIcon from '@/shared/ui/icons/common/delete.svg';

import { cn } from '../../utils/cn';

const Root = Drawer.Root;

const Trigger = ({
  asChild = true,
  ...props
}: ComponentProps<typeof Drawer.Trigger>) => (
  <Drawer.Trigger asChild={asChild} {...props} />
);

const Overlay = ({
  className,
  ...props
}: ComponentProps<typeof Drawer.Overlay>) => (
  <Drawer.Overlay
    className={cn('fixed inset-0 z-40 bg-black/40', className)}
    {...props}
  />
);

const Handle = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    aria-hidden
    className={cn(
      'mx-auto mt-3 mb-2 h-1.5 w-10 shrink-0 rounded-full bg-gray-200',
      className,
    )}
    {...props}
  />
);

interface ContentProps extends ComponentProps<typeof Drawer.Content> {
  showCloseButton?: boolean;
}

const Content = ({
  children,
  className,
  showCloseButton = true,
  ...props
}: ContentProps) => (
  <Drawer.Portal>
    <Overlay />
    <Drawer.Content
      className={cn(
        'fixed bottom-0 left-1/2 z-50 flex max-h-[85dvh] w-full max-w-107.5 -translate-x-1/2 flex-col rounded-t-2xl bg-white outline-none',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <Drawer.Close className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none">
          <DeleteIcon aria-hidden width={20} height={20} />
          <span className="sr-only">닫기</span>
        </Drawer.Close>
      )}
    </Drawer.Content>
  </Drawer.Portal>
);

const Header = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('shrink-0 px-5 pt-2 pb-4', className)} {...props} />
);

const Title = ({
  className,
  ...props
}: ComponentProps<typeof Drawer.Title>) => (
  <Drawer.Title
    className={cn('text-lg font-semibold text-gray-900', className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: ComponentProps<typeof Drawer.Description>) => (
  <Drawer.Description
    className={cn('mt-1 text-sm text-gray-500', className)}
    {...props}
  />
);

const Body = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('px-5', className)} {...props} />
);

const Footer = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('shrink-0 px-5 pt-2 pb-6', className)} {...props} />
);

const Close = ({
  asChild = true,
  ...props
}: ComponentProps<typeof Drawer.Close>) => (
  <Drawer.Close asChild={asChild} {...props} />
);

export const BottomSheet = {
  Root,
  Trigger,
  Overlay,
  Handle,
  Content,
  Header,
  Title,
  Description,
  Body,
  Footer,
  Close,
};
