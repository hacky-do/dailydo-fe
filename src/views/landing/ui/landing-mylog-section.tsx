import { FadeIn } from '@/shared/ui/fade-in';
import { SectionHeading } from '@/shared/ui/section-heading';
import { cn } from '@/shared/utils/cn';

const ChatBubble = ({
  variant,
  children,
}: {
  variant: 'white' | 'green';
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      'w-fit max-w-3/5 rounded-2xl px-4 py-2.5 text-sm font-medium tracking-tight shadow',
      variant === 'white'
        ? 'rounded-tl-none bg-white text-gray-800'
        : 'rounded-tr-none bg-green-500 text-white',
    )}
  >
    {children}
  </div>
);

export const LandingMylogSection = () => {
  return (
    <section className="bg-white px-5 py-16">
      <FadeIn>
        <SectionHeading
          align="left"
          label="마이로그"
          title={
            <>
              미션들을 수행하고
              <br />
              자유롭게 로그를 작성해보세요
            </>
          }
          description={
            <>
              미션을 진행하며 느낀 것들을 자유롭게 작성하세요.
              <br />
              다른 누구도 아닌, 오직 나를 위한 기록이에요.
            </>
          }
        />
      </FadeIn>

      {/* 채팅 말풍선 */}
      <div className="mt-10 flex flex-col gap-5">
        <FadeIn delay={150} className="flex items-center justify-between gap-3">
          <ChatBubble variant="white">맑은 날의 예쁜 하늘😊</ChatBubble>
        </FadeIn>
        <FadeIn delay={250} className="flex items-center justify-between gap-3">
          <ChatBubble variant="green">나만의 공간에서 만끽한 힐링</ChatBubble>
        </FadeIn>
      </div>

      <div className="mt-8 flex justify-center"></div>
    </section>
  );
};
