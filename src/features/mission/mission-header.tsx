'use client';

import { useSyncExternalStore } from 'react';

import ImgHeadImage from '@/shared/ui/icons/common/img_head.svg';
import IcImage from '@/shared/ui/icons/mission/ic.svg';
import IcAlarmImage from '@/shared/ui/icons/mission/ic_alarm.svg';
import { getTimeUntilReset } from '@/shared/utils/reset-cycle';

interface MissionHeaderProps {
  type?: 'today' | 'mymission';
  maxSelectableCount?: number;
}

const MissionHeader = ({
  type = 'today',
  maxSelectableCount,
}: MissionHeaderProps) => {
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
        {type === 'today' ? (
          <IcImage className="h-14.25 w-8" />
        ) : (
          <ImgHeadImage className="h-14.25 w-8" />
        )}
        <div className="font-semi-bold bg-bg-timer flex w-41.75 items-center gap-1 rounded-lg px-2 text-sm">
          <IcAlarmImage className="h-6 w-6" />
          <span className="text-timer-text">초기화까지 {timer}</span>
        </div>
        <div>
          <span className="text-2xl font-bold">
            {type === 'today'
              ? '오늘의 미션이 도착했어요!'
              : '오늘은 어떤 일이 일어날까요?'}
          </span>
        </div>
        <div className="mb-7.5">
          <span className="text-base">
            {type === 'today'
              ? `최대 ${maxSelectableCount}개의 미션을 선택할 수 있어요.`
              : '가벼운 마음으로 시작해봐요.'}
          </span>
        </div>
      </div>
    </>
  );
};

export default MissionHeader;
