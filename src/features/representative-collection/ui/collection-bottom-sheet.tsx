import Image from 'next/image';

import type { Collection } from '@/entities/collection';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import LockedIcon from '@/shared/ui/icons/collections/locked.svg';
import SpecialCollectionIcon from '@/shared/ui/icons/collections/special_collection.svg';

interface CollectionBottomSheetProps extends Omit<Collection, 'requirements'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completed: boolean;
  requirements?: Collection['requirements'];
  action?: React.ReactNode;
}

export const CollectionBottomSheet = ({
  open,
  onOpenChange,
  id,
  title,
  description,
  src,
  type,
  requirements = [],
  completed,
  action,
  acquisitionRate,
}: CollectionBottomSheetProps) => {
  const isSpecial = type === 'SPECIAL';
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
            <Image
              src={src}
              alt=""
              width={80}
              height={80}
              className="my-1"
              sizes="80px"
            />
          ) : isSpecial ? (
            <div className="-mb-6 flex size-20 items-center justify-center">
              <SpecialCollectionIcon className="my-1" width={65} />
            </div>
          ) : (
            <div className="-mb-6 flex size-20 items-center justify-center">
              <LockedIcon className="my-1" width={65} />
            </div>
          )}

          {completed &&
            requirements.map((requirement) => (
              <div key={requirement.missionId} className="flex flex-col">
                <p className="text-xs font-normal text-gray-500">
                  {requirement.title}{' '}
                  <span className="font-semibold">
                    {requirement.count} 완료
                  </span>
                </p>
              </div>
            ))}
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <div>{action}</div>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
