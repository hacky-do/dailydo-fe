export const RecentLoginBadge = () => {
  return (
    <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center">
      <div className="rounded-3xl bg-black/80 px-3 py-1.5 whitespace-nowrap">
        <p className="text-sm leading-5 font-medium text-white">
          최근에 로그인했어요
        </p>
      </div>
      <div className="h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-black/80" />
    </div>
  );
};
