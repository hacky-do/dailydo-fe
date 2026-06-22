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
    <li className="flex flex-col items-center gap-1 rounded-2xl bg-white py-2 text-sm font-semibold">
      <Skeleton variant="sm" className="size-20" />
      <TextSkeleton variant="sm" className="w-20" />
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
        setIsOpen(false);
      },
    });
  };

  const handleDeleteCollection = () => {
    deleteUserCollection(String(id), {
      onSuccess: () => {
        toast({
          message: '대표 컬렉션 설정이 해제되었습니다.',
          type: 'success',
        });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <li
        className="flex h-24 flex-col items-center justify-center"
        id={String(id)}
        onClick={() => setIsOpen(true)}
      >
        {completed ? (
          <Image
            src={imgSrc}
            alt=""
            width={80}
            height={80}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
        ) : (
          <LockedIcon width={80} />
        )}
        <span className="pt-1 text-xs font-semibold">{title}</span>
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
