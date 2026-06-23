import Image from 'next/image';
import { useState } from 'react';

import type { Collection } from '@/entities/collection';
import {
  useDeleteUserCollection,
  usePostUserCollection,
} from '@/entities/collection';
import { CollectionBottomSheet } from '@/features/representative-collection';
import LockedIcon from '@/shared/ui/icons/collections/locked.svg';
import SpecialCollectionIcon from '@/shared/ui/icons/collections/special_collection.svg';
import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';

export const CollectionSkeleton = () => {
  return (
    <li>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-1">
        <div className="flex w-20 flex-col items-center justify-center">
          <Skeleton variant="lg" />
        </div>
        <TextSkeleton variant="sm" className="w-14" />
      </div>
    </li>
  );
};

interface CollectionBoxProps extends Collection {
  isRepresentative?: boolean;
  completed?: boolean;
}

export const CollectionBox = ({
  id,
  src,
  title,
  type,
  description,
  requirements,
  isRepresentative = false,
  completed = false,
  acquisitionRate,
}: CollectionBoxProps) => {
  const isSpecial = type === 'SPECIAL';
  const [open, setIsOpen] = useState(false);
  const { mutate: postUserCollection } = usePostUserCollection();
  const { mutate: deleteUserCollection } = useDeleteUserCollection();
  const { toast } = useToast();

  const handlePostCollection = () => {
    postUserCollection(String(id), {
      onSuccess: () => {
        toast({
          message: '대표 컬렉션 설정이 완료되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        toast({
          message: '대표 컬렉션 설정이 실패하였습니다.',
          type: 'error',
        });
      },
    });
    setIsOpen(false);
  };

  const handleDeleteCollection = () => {
    deleteUserCollection(String(id), {
      onSuccess: () => {
        toast({
          message: '대표 컬렉션 설정이 해제되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        toast({
          message: '대표 컬렉션 설정 해제에 실패하였습니다.',
          type: 'error',
        });
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <li id={String(id)} className={cn(!completed && 'opacity-50')}>
        <button
          type="button"
          className={cn(
            'flex h-24 w-full flex-col items-center justify-center rounded-xl',
          )}
          onClick={() => setIsOpen(true)}
        >
          {completed ? (
            <Image src={src} alt="" width={80} height={80} sizes={'80'} />
          ) : isSpecial ? (
            <SpecialCollectionIcon width={80} height={80} />
          ) : (
            <LockedIcon width={80} />
          )}
          <span className={cn('pt-1 text-xs font-semibold')}>
            {isSpecial && !completed ? '???' : title}
          </span>
        </button>
      </li>

      <CollectionBottomSheet
        open={open}
        onOpenChange={setIsOpen}
        id={id}
        title={title}
        description={description}
        completed={completed}
        src={src}
        type={type}
        requirements={requirements}
        isRepresentative={isRepresentative}
        onPost={handlePostCollection}
        onDelete={handleDeleteCollection}
        acquisitionRate={acquisitionRate}
      />
    </>
  );
};
