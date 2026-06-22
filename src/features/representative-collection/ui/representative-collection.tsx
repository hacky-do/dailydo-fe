'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { UserCollection } from '@/entities/collection';
import { useDeleteUserCollection } from '@/entities/collection';
import { useToast } from '@/shared/ui/toast';

import { RepresentativeCollectionBottomSheet } from './representative-collection-bottom-sheet';

interface RepresentativeCollectionProps {
  userCollection?: UserCollection | null;
  isPending: boolean;
}

export const RepresentativeCollection = ({
  userCollection,
  isPending,
}: RepresentativeCollectionProps) => {
  const [open, setIsOpen] = useState(false);

  const { mutate: deleteUserCollection } = useDeleteUserCollection();
  const { toast } = useToast();

  const handleDeleteCollection = () => {
    if (!userCollection) return;
    deleteUserCollection(userCollection.id, {
      onSuccess: () => {
        toast({
          message: '대표 컬렉션 설정이 해제되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        toast({
          message: '대표 컬렉션 설정 해제에 실패하였습니다.',
          type: 'success',
        });
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="relative flex flex-col items-center pt-4"
        onClick={() => userCollection && setIsOpen(true)}
        disabled={!userCollection}
        type="button"
      >
        <h4 className="z-10 -mb-2 rounded-xl bg-white px-2 py-1 text-sm font-bold text-green-600 shadow">
          나의 대표 컬렉션
        </h4>
        <div className="relative flex items-center justify-center">
          <div className="absolute h-38 w-38 rounded-full border-[6px] border-green-500" />
          <div className="absolute h-34.5 w-34.5 rounded-full border-[6px] border-green-400" />
          <div className="relative flex h-31.5 w-31.5 items-center justify-center overflow-hidden rounded-full bg-green-100">
            {userCollection && (
              <Image
                src={userCollection.image}
                alt=""
                width={80}
                height={80}
                className="object-cover"
                sizes="80px"
              />
            )}
          </div>
        </div>
        {!isPending && (
          <p className="absolute -bottom-4 z-10 rounded-sm bg-green-600 px-2 py-1 text-xs font-semibold whitespace-nowrap text-white">
            {userCollection?.title ?? '대표 컬렉션이 설정되지 않았어요.'}
          </p>
        )}
      </button>

      {userCollection && (
        <RepresentativeCollectionBottomSheet
          open={open}
          onOpenChange={setIsOpen}
          id={userCollection.id}
          title={userCollection.title}
          description={userCollection.description}
          image={userCollection.image}
          onDelete={handleDeleteCollection}
        />
      )}
    </>
  );
};
