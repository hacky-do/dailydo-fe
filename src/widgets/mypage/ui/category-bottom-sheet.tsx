'use client';

import { useState } from 'react';

import type { Category } from '@/entities/category';
import { usePutUserCategories } from '@/entities/category/api/category.queries';
import { UserCategory } from '@/entities/user/model/user.types';
import { CategorySelect } from '@/features/category-select';
import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/ui/toast';

interface CategoryBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userCategories: UserCategory[];
  categories: Category[];
}

interface CategoryBottomSheetContentProps {
  onOpenChange: (open: boolean) => void;
  userCategories: UserCategory[];
  categories: Category[];
}

const CategoryBottomSheetContent = ({
  onOpenChange,
  userCategories,
  categories,
}: CategoryBottomSheetContentProps) => {
  const initialIds = userCategories.map((c) => c.categoryId);
  const [selectedIds, setSelectedIds] = useState<number[]>(initialIds);
  const { mutate: putUserCategories, isPending } = usePutUserCategories();
  const { toast } = useToast();

  const isUnchanged =
    selectedIds.length === initialIds.length &&
    selectedIds.every((id) => initialIds.includes(id));

  const handleSubmit = () => {
    putUserCategories(selectedIds, {
      onSuccess: () => {
        toast({ type: 'success', message: '카테고리 수정을 완료했어요.' });
        onOpenChange(false);
      },
      onError: () => {
        toast({
          type: 'error',
          message: '카테고리 수정에 실패했어요. 다시 시도해주세요.',
        });
      },
    });
  };

  return (
    <>
      <BottomSheet.Body className="flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">추천받고 싶은 카테고리를 선택해주세요.</p>
          <p className="text-xs text-gray-500">
            최소 2개 이상 선택이 필요해요.
          </p>
        </div>
        <CategorySelect
          categories={categories}
          value={selectedIds}
          onChange={setSelectedIds}
          disabled={isPending}
        />
      </BottomSheet.Body>
      <BottomSheet.Footer className="flex gap-3">
        <Button variant="tertiary" onClick={() => onOpenChange(false)}>
          취소하기
        </Button>
        <Button
          variant="primary"
          disabled={selectedIds.length < 2 || isUnchanged}
          isLoading={isPending}
          className="w-full"
          onClick={handleSubmit}
        >
          완료하기
        </Button>
      </BottomSheet.Footer>
    </>
  );
};

export const CategoryBottomSheet = ({
  open,
  onOpenChange,
  userCategories,
  categories,
}: CategoryBottomSheetProps) => (
  <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
    <BottomSheet.Content className="flex flex-col gap-4">
      <BottomSheet.Header>
        <BottomSheet.Title>카테고리 수정</BottomSheet.Title>
      </BottomSheet.Header>
      <CategoryBottomSheetContent
        onOpenChange={onOpenChange}
        userCategories={userCategories}
        categories={categories}
      />
    </BottomSheet.Content>
  </BottomSheet.Root>
);
