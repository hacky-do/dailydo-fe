'use client';

import { useLayoutEffect, useRef } from 'react';

import { Loader } from '@/shared/ui/loader';
import { Calendar } from '@/widgets/mylogs';
import { MOCK_LOG_RECORDS } from '@/widgets/mylogs/model/mylogs.mock';

export const Mylogs = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 스크롤이 아래부터 시작, flash 방지
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView();
    bottomRef.current?.focus({ preventScroll: true });
    containerRef.current?.classList.remove('invisible');
    loaderRef.current?.classList.add('hidden');
  }, []);

  return (
    <div className="scrollbar-hide relative h-full w-full overflow-y-auto bg-white p-5">
      <div
        ref={loaderRef}
        className="absolute inset-0 flex items-center justify-center bg-white"
      >
        <Loader />
      </div>
      <ul ref={containerRef} className="invisible divide-y divide-gray-100">
        {MOCK_LOG_RECORDS.map((record) => (
          <li className="py-8" key={`${record.year}-${record.month}`}>
            <Calendar
              year={record.year}
              month={record.month}
              logs={record.logs}
            />
          </li>
        ))}
      </ul>
      <div ref={bottomRef} tabIndex={-1} />
    </div>
  );
};
