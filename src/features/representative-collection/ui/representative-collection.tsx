'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  useDeleteUserCollection,
} from '@/entities/collection/api/collection.queries';
import { UserCollection } from '@/entities/collection/model/collection.types';
import { useToast } from '@/shared/ui/toast';

import { CollectionBottomSheet } from './collection-bottom-sheet';

const FALLBACK_IMAGE = '/mocks/images/test_image.png';

interface RepresentativeCollectionProps {
  userCollections?: UserCollection;
  defaultImage: string;
  defaultTitle: string;
}

export const RepresentativeCollection = ({
  userCollections,
  defaultImage,
  defaultTitle,
}: RepresentativeCollectionProps) => {
  const [open, setIsOpen] = useState(false);
  const { mutate: deleteUserCollection } = useDeleteUserCollection();
  const { toast } = useToast();

  const image = userCollections?.image ?? defaultImage;
  const title = userCollections?.title ?? defaultTitle;

  const handleDeleteCollection = () => {
    if (!userCollections) return;
    deleteUserCollection(userCollections.id, {
      onSuccess: () => {
        toast({ message: '대표 컬렉션 설정이 해제되었습니다.', type: 'success' });
        setIsOpen(false);
      },
    });
  };

  return (
    <>
      <div
        className="flex flex-col items-center pt-4"
        onClick={() => userCollections && setIsOpen(true)}
      >
        <span className="z-10 -mb-2 rounded-xl bg-white px-2 py-1 text-sm font-bold text-green-600 shadow">
          나의 대표 컬렉션
        </span>
        <div className="relative flex items-center justify-center">
          <div className="absolute h-38 w-38 rounded-full border-[6px] border-green-500" />
          <div className="absolute h-34.5 w-34.5 rounded-full border-[6px] border-green-400" />
          <div className="relative flex h-31.5 w-31.5 items-center justify-center overflow-hidden rounded-full bg-green-100">
            <Image
              src={image}
              alt=""
              width={80}
              height={80}
              className="object-cover"
              sizes="80px"
            />
          </div>
        </div>
        <div className="z-10 -m-2 rounded-sm bg-green-600 px-2 py-1 text-white">
          <span className="text-xs font-semibold">{title}</span>
        </div>
      </div>

      {userCollections && (
        <CollectionBottomSheet
          open={open}
          onOpenChange={setIsOpen}
          id={userCollections.id}
          title={userCollections.title}
          description={userCollections.description}
          completed={true}
          src={userCollections.image ?? FALLBACK_IMAGE}
          isRepresentative={true}
          onPost={() => {}}
          onDelete={handleDeleteCollection}
        />
      )}
    </>
  );
};
