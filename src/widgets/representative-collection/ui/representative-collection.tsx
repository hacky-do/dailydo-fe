interface RepresentativeCollectionProps {
  title: string;
}

export const RepresentativeCollection = ({ title }: RepresentativeCollectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="z-10 rounded-xl bg-white px-2 py-1 text-sm font-bold text-green-600">
        나의 대표 컬렉션
      </span>
      <div className="relative flex items-center justify-center">
        <div className="absolute h-38 w-38 rounded-full border-[6px] border-green-500" />
        <div className="absolute h-34.5 w-34.5 rounded-full border-[6px] border-green-400" />
        <div className="h-31 w-31 rounded-full bg-green-100" />
      </div>
      <div className="z-10 rounded-sm bg-green-600 px-2 py-1 text-white">
        <span className="text-xs font-semibold">{title}</span>
      </div>
    </div>
  );
};
