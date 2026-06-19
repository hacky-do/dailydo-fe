import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useGetUserCollection } from '@/entities/collection/api/collection.queries';
import { ROUTES } from '@/shared/config/routes';
import ChevronRight from '@/shared/ui/icons/mypage/chevron_right.svg';
import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';

import { sectionLabelClass } from './mypage.styles';

const CollectionImage = ({ src }: { src: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative size-16 shrink-0">
      {isLoading && <Skeleton variant="lg" className="absolute inset-0" />}
      <Image
        src={src}
        alt=""
        fill
        sizes="64px"
        className={`object-cover ${isLoading ? 'invisible' : 'visible'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export const CollectionSectionSkeleton = () => (
  <section className="flex flex-col gap-2">
    <h4>
      <Link
        href={ROUTES.COLLECTIONS}
        className={`flex items-center gap-1 ${sectionLabelClass}`}
      >
        대표 컬렉션
        <ChevronRight height={16} aria-hidden="true" />
      </Link>
    </h4>
    <div className="flex rounded-2xl bg-white p-4 shadow">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <TextSkeleton variant="base" className="w-28" />
          <TextSkeleton variant="xs" className="w-60" />
          <TextSkeleton variant="xs" className="w-60" />
        </div>
        <Skeleton variant="lg" />
      </div>
    </div>
  </section>
);

export const CollectionSection = () => {
  const { data: collection, isPending, isError } = useGetUserCollection();

  if (isPending) return <CollectionSectionSkeleton />;

  return (
    <section className="flex flex-col gap-2">
      <h4>
        <Link
          href={ROUTES.COLLECTIONS}
          className={`flex items-center gap-1 ${sectionLabelClass}`}
        >
          대표 컬렉션
          <ChevronRight height={16} aria-hidden="true" />
        </Link>
      </h4>
      <div className="flex rounded-2xl bg-white p-4 shadow">
        {isError ? (
          <p className="flex h-16 w-full items-center justify-center text-xs text-gray-800">
            컬렉션 정보를 불러오지 못했어요.
          </p>
        ) : collection ? (
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-green-600">
                {collection.title}
              </span>
              <span className="text-xs text-gray-700">
                {collection.description}
              </span>
            </div>
            <CollectionImage src={collection.image} />
          </div>
        ) : (
          <p className="flex h-16 w-full items-center justify-center text-xs text-gray-800">
            설정된 컬렉션이 없어요.
          </p>
        )}
      </div>
    </section>
  );
};
