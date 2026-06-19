import Image from 'next/image';
import { useState } from 'react';

import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';
import QuestionBackIcon from '@/shared/ui/icons/mission/question_back.svg';
import { useToast } from '@/shared/ui/toast';

import {
  useDeleteUserCollection,
  usePostUserCollection,
} from '../api/collection.queries';
import { Collection } from '../model/collection.types';

const FALLBACK_IMAGE = '/mocks/images/test_image.png';

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
  isRepresentative,
  completed = false,
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
          <div className="flex aspect-square h-20 w-20 items-center justify-center rounded-full bg-green-300">
            <QuestionBackIcon className="h-7.5 w-6.25" />
          </div>
        )}
        <span className="pt-1 text-xs font-semibold">{title}</span>
      </li>
      <BottomSheet.Root open={open} onOpenChange={setIsOpen}>
        <BottomSheet.Content>
          <BottomSheet.Header></BottomSheet.Header>
          <BottomSheet.Body className="mb-8 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-0.5">
              <h1 className="text-lg font-semibold">{title}</h1>
              <span className="text-sm break-keep text-gray-500">
                {description}
              </span>
              <span className="rounded-3xl bg-green-100 px-3 py-1 text-xs text-green-500">
                {description}이하의 사용자가 획득했어요!
              </span>
            </div>

            {completed ? (
              <Image
                src={imgSrc}
                alt=""
                width={80}
                height={80}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className="my-1"
              />
            ) : (
              <QuestionBackIcon className="my-1 h-20 w-20" />
            )}
            {requirements.map((requirement) => (
              <div key={requirement.missionId} className="flex flex-col">
                <p className="text-xs">
                  {requirement.title}{' '}
                  <span className="font-semibold">
                    {requirement.count} 완료
                  </span>
                </p>
              </div>
            ))}
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <div>
              {isRepresentative ? (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleDeleteCollection}
                >
                  대표 컬렉션에서 해제
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={handlePostCollection}
                >
                  대표 컬렉션으로 설정
                </Button>
              )}
            </div>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </>
  );
};
