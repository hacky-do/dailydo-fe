'use client';

import { Drawer } from 'vaul';

import { Button } from '../button';
import { BottomSheet } from './bottom-sheet';

interface AlertBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const AlertBottomSheet = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = '완료',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  isLoading = false,
}: AlertBottomSheetProps) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content>
        <div className="px-5 pt-6 pb-2 text-center">
          <Drawer.Title className="text-base font-semibold text-gray-900">
            {title}
          </Drawer.Title>
          {description && (
            <Drawer.Description className="mt-2 text-sm text-gray-500">
              {description}
            </Drawer.Description>
          )}
        </div>
        <BottomSheet.Footer className="flex gap-3">
          <Button
            variant="tertiary"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
