'use client';

import { useSyncExternalStore } from 'react';

import IcImage from '@/shared/ui/icons/mission/ic.svg';
import IcAlarmImage from '@/shared/ui/icons/mission/ic_alarm.svg';
import { getTimeUntilReset } from '@/shared/utils/reset-cycle';

interface MissionHeaderProps {
  maxSelectableCount?: number;
}

const MissionHeader = ({ maxSelectableCount }: MissionHeaderProps) => {
  const timer = useSyncExternalStore(
    (onStoreChange) => {
      const id = setInterval(onStoreChange, 1000);
      return () => clearInterval(id);
    },
    getTimeUntilReset,
    () => '',
  );
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <IcImage className="h-14.25 w-8" />
        <div className="font-semi-bold bg-bg-timer flex items-center gap-1 rounded-lg px-2 text-sm">
          <IcAlarmImage className="h-6 w-6" />
          <span className="text-timer-text">초기화까지 {timer}</span>
        </div>
        <div>
          <span className="text-2xl font-bold">오늘의 미션이 도착했어요!</span>
        </div>
        <div className="mb-7.5">
          <span className="text-base">
            최대 {maxSelectableCount}개의 미션을 선택할 수 있어요.
          </span>
        </div>
      </div>
    </>
  );
};

export default MissionHeader;
