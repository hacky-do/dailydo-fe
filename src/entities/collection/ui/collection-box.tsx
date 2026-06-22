import Image from 'next/image';
import { useState } from 'react';

import { CollectionBottomSheet } from '@/features/representative-collection';
import LockedIcon from '@/shared/ui/icons/collections/locked.svg';
import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';
import { useToast } from '@/shared/ui/toast';

import {
  useDeleteUserCollection,
  usePostUserCollection,
} from '../api/collection.queries';
import { Collection } from '../model/collection.types';

const FALLBACK_IMAGE = '/mocks/images/test_image.png';

export const CollectionSkeleton = () => {
  return (
    <li>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-1">
        <Skeleton variant="lg" />
        <TextSkeleton variant="xs" className="w-14" />
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
  description,
  requirements,
  isRepresentative = false,
  completed = false,
  acquisitionRate,
}: CollectionBoxProps) => {
  const [open, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);
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
      <li id={String(id)}>
        <button
          type="button"
          className="flex h-24 w-full flex-col items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          {completed ? (
            <Image
              src={imgSrc}
              alt=""
              width={80}
              height={80}
              sizes={'80'}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
          ) : (
            <LockedIcon width={80} />
          )}
          <span className="pt-1 text-xs font-semibold">{title}</span>
        </button>
      </li>

      <CollectionBottomSheet
        open={open}
        onOpenChange={setIsOpen}
        id={id}
        title={title}
        description={description}
        completed={completed}
        src={imgSrc}
        requirements={requirements}
        isRepresentative={isRepresentative}
        onPost={handlePostCollection}
        onDelete={handleDeleteCollection}
        acquisitionRate={acquisitionRate}
      />
    </>
  );
};
