import { SectionHeading } from '@/shared/ui/section-heading';
import { cn } from '@/shared/utils/cn';

const MissionCardPlaceholder = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      'bg-gradient-500 shadow-card flex h-82 w-56 flex-col items-center justify-center gap-4 rounded-3xl [--gradient-dir:to_top]',
      className,
    )}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-3xl font-bold text-white">
      ?
    </div>
    <div className="text-center text-white">
      <p className="text-lg font-bold">오늘의 미션</p>
      <p className="text-sm font-medium opacity-90">함께 확인해봐요</p>
    </div>
  </div>
);

export const LandingMissionSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16">
      <SectionHeading
        label="오늘의 미션"
        title="다양한 분야의 미션을 만나보세요"
        description="취향에 따라서 원하는 미션을 골라보세요."
      />

      {/* 미션 카드 캐러셀 (중앙 카드 + 우측 카드 살짝 보임) */}
      <div className="relative mt-12 h-82">
        <div className="absolute top-0 left-1/2 z-10 -translate-x-[calc(50%+40px)]">
          <MissionCardPlaceholder />
        </div>
        <div className="absolute top-4 left-1/2 translate-x-[calc(50%-40px)] scale-95 opacity-80">
          <MissionCardPlaceholder />
        </div>
      </div>
    </section>
  );
};
