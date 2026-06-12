import Image from 'next/image';

interface RepresentativeCollectionProps {
  title: string;
  imageSrc: string;
}

export const RepresentativeCollection = ({
  title,
  imageSrc,
}: RepresentativeCollectionProps) => {
  return (
    <div className="flex flex-col items-center pt-4">
      <span className="z-10 -mb-2 rounded-xl bg-white px-2 py-1 text-sm font-bold text-green-600 shadow">
        나의 대표 컬렉션
      </span>
      <div className="relative flex items-center justify-center">
        <div className="absolute h-38 w-38 rounded-full border-[6px] border-green-500" />
        <div className="absolute h-34.5 w-34.5 rounded-full border-[6px] border-green-400" />
        <div className="relative flex h-31.5 w-31.5 items-center justify-center overflow-hidden rounded-full bg-green-100">
          <Image
            src={imageSrc}
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
  );
};
