'use client';

import { ComponentProps } from 'react';
import { Drawer } from 'vaul';

import { cn } from '../../utils/cn';
import { BottomSheet } from './bottom-sheet';

const Root = (props: ComponentProps<typeof Drawer.Root>) => (
  <Drawer.Root snapPoints={[0.96]} fadeFromIndex={0} {...props} />
);

const Content = ({ className, ...props }: ComponentProps<typeof BottomSheet.Content>) => (
  <BottomSheet.Content className={cn('h-[96dvh] max-h-[96dvh]', className)} {...props} />
);

const Body = ({ className, ...props }: ComponentProps<'div'>) => (
  <BottomSheet.Body className={cn('flex-1 overflow-y-auto', className)} {...props} />
);

export const FullBottomSheet = {
  Root,
  Trigger: BottomSheet.Trigger,
  Overlay: BottomSheet.Overlay,
  Handle: BottomSheet.Handle,
  Content,
  Header: BottomSheet.Header,
  Title: BottomSheet.Title,
  Description: BottomSheet.Description,
  Body,
  Footer: BottomSheet.Footer,
  Close: BottomSheet.Close,
};
