import { StartButton } from './start-button';

const ScrollChevron = () => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="animate-bounce text-green-500"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 14l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LandingHeroSection = () => {
  return (
    <section className="bg-gradient-100 relative overflow-hidden px-5 pt-12 pb-10">
      <div
        aria-hidden="true"
        className="absolute top-11 -left-6 h-24 w-24 rounded-full bg-green-200/60"
      />

      <div className="relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="flex flex-col gap-2 text-3xl font-bold tracking-tight text-black">
            <span>Daily:DO,</span>
            <span>오늘의 나에게 건네는 선물</span>
          </h1>
          <p className="text-base font-medium tracking-tight text-gray-600">
            행복은 멀리 있지 않아요.
            <br />
            당신의 하루에 작은 기적을 더합니다.
          </p>
        </div>

        <StartButton>시작하기</StartButton>
      </div>

      <div className="relative z-10 mx-auto mt-12 flex aspect-square w-full max-w-70 items-center justify-center">
        <div className="absolute aspect-square w-[95%] rounded-full bg-green-200/70" />
        <div className="absolute aspect-square w-[78%] rounded-full bg-green-300/70" />
        <div className="relative aspect-square w-[70%] rounded-full bg-transparent text-green-700/60" />
      </div>

      <div className="relative z-10 mt-6 flex justify-center">
        <ScrollChevron />
      </div>
    </section>
  );
};
