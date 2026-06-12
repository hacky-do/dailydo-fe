import Image from 'next/image';

import { Collection } from '../model/collection.types';

export const CollectionBox = ({ id, src, title }: Collection) => {
  return (
    <div className="flex h-24 flex-col items-center justify-center" id={String(id)}>
      <Image src={src} alt="" width={80} height={80} />
      <span className="text-xs font-semibold">{title}</span>
    </div>
  );
};
