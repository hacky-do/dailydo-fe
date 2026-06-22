import Image from 'next/image';

import type { UserCollection } from '@/entities/collection';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';

const FALLBACK_IMAGE = '/mocks/images/test_image.png';

interface RepresentativeCollectionBottomSheetProps extends UserCollection {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export const RepresentativeCollectionBottomSheet = ({
  open,
  onOpenChange,
  id,
  image,
  title,
  description,
  onDelete,
}: RepresentativeCollectionBottomSheetProps) => {
  return (
    <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content>
        <BottomSheet.Header />
        <BottomSheet.Title />
        <BottomSheet.Body className="mb-8 flex flex-col items-center justify-center">
          <div
            className="flex flex-col items-center justify-center gap-2"
            key={id}
          >
            <h1 className="text-lg font-semibold">{title}</h1>
            <span className="text-sm break-keep text-gray-500">
              {description}
            </span>
          </div>
          <Image
            src={image || FALLBACK_IMAGE}
            alt={title}
            width={80}
            height={80}
            className="my-1"
            sizes="80px"
          />
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button variant="secondary" type="button" onClick={onDelete}>
            대표 컬렉션에서 해제
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
