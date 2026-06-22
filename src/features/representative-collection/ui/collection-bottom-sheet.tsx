import Image from 'next/image';

import { Collection } from '@/entities/collection/model/collection.types';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';
import LockedIcon from '@/shared/ui/icons/collections/locked.svg';

interface CollectionBottomSheetProps extends Omit<Collection, 'requirements'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRepresentative: boolean;
  completed: boolean;
  requirements?: Collection['requirements'];
  onPost: () => void;
  onDelete: () => void;
}

export const CollectionBottomSheet = ({
  open,
  onOpenChange,
  id,
  title,
  description,
  src,
  requirements = [],
  isRepresentative,
  completed,
  onPost,
  onDelete,
  acquisitionRate,
}: CollectionBottomSheetProps) => {
  return (
    <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content>
        <BottomSheet.Header></BottomSheet.Header>
        <BottomSheet.Title></BottomSheet.Title>
        <BottomSheet.Body className="mb-8 flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center gap-2"
            key={id}
          >
            <h1 className="text-lg font-semibold">{title}</h1>
            <span className="text-sm break-keep text-gray-500">
              {description}
            </span>
            <span className="rounded-3xl bg-green-100 px-3 py-1 text-xs text-green-500">
              {acquisitionRate}% 이하의 사용자가 획득했어요!
            </span>
          </div>

          {completed ? (
            <Image src={src} alt="" width={80} height={80} className="my-1" />
          ) : (
            <LockedIcon className="my-1 h-20 w-20" />
          )}

          {requirements.map((requirement) => (
            <div key={requirement.missionId} className="flex flex-col">
              <p className="text-xs font-normal text-gray-500">
                {requirement.title}{' '}
                <span className="font-semibold">{requirement.count} 완료</span>
              </p>
            </div>
          ))}
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <div>
            {isRepresentative ? (
              <Button variant="secondary" type="button" onClick={onDelete}>
                대표 컬렉션에서 해제
              </Button>
            ) : (
              <Button variant="primary" type="button" onClick={onPost}>
                대표 컬렉션으로 설정
              </Button>
            )}
          </div>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
