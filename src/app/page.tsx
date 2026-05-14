'use client';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80">
        <button
          onClick={() => {
            throw new Error('Sentry 연결 테스트 ');
          }}
        >
          에러 발생시키기
        </button>
        <button
          onClick={() => {
            throw new Error('Sentry 연결 테스트 2');
          }}
        >
          에러 발생시키기2
        </button>
      </div>
    </div>
  );
}
