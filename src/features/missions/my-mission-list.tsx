'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useMissions } from '@/entities/missions/apis/use-missions';
import { Mission } from '@/entities/missions/model/mission.types';
import { Button } from '@/shared/ui/button/button';
import { cn } from '@/shared/utils/cn';
import { Card } from '@/widgets/card';

interface MissionCompleteSheetProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const MissionCompleteSheet = ({
  onConfirm,
  onCancel,
}: MissionCompleteSheetProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-t-2xl bg-white px-6 pt-6 pb-10">
        <p className="mb-6 text-center text-lg font-semibold text-gray-800">
          미션을 완료하시겠어요?
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onCancel}
            type="button"
          >
            취소
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm} type="button">
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MyMissionBackContentProps {
  mission: Mission;
  isCompleted: boolean;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyMissionBackContent = ({
  mission,
  isCompleted,
  onCompleteClick,
}: MyMissionBackContentProps) => {
  return (
    <>
      <span
        className={cn(
          'rounded-2xl px-2 py-1 text-xs font-normal',
          isCompleted ? 'bg-white' : 'bg-gray-100',
          isCompleted
            ? mission.isSpecial
              ? 'text-special-text-color'
              : 'text-green-600'
            : 'text-gray-600',
        )}
      >
        {mission.isSpecial ? '히든 미션' : mission.categoryName}
      </span>
      <p
        className={cn(
          'text-center text-xl font-semibold',
          isCompleted ? 'text-white' : 'text-gray-800',
        )}
      >
        {mission.title}
      </p>
      <Image
        src={mission.image || '/mocks/images/test_image.png'}
        alt={mission.title}
        width={147}
        height={147}
        className={cn(
          'rounded-full object-cover transition-all duration-500 ease-out',
          isCompleted ? 'h-[147px] w-[147px]' : 'h-20 w-20',
        )}
      />
      {isCompleted && (
        <span className="animate-slide-up text-xs font-normal text-white">
          조각구름이 흩어지기 전에 순간포착!
        </span>
      )}

      {!isCompleted && (
        <Button
          variant="primary"
          size="md"
          onClick={onCompleteClick}
          type="button"
        >
          완료하기
        </Button>
      )}
    </>
  );
};

export const MyMissionCard = ({ mission }: { mission: Mission }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSheetOpen(true);
  };

  const handleConfirm = async () => {
    setIsCompleted(true);
    setIsSheetOpen(false);
  };

  const handleSheetCancel = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <Card
        isSpecial={mission.isSpecial}
        isCompleted={isCompleted}
        defaultFlipped
      >
        <Card.Back>
          <MyMissionBackContent
            mission={mission}
            isCompleted={isCompleted}
            onCompleteClick={handleCompleteClick}
          />
        </Card.Back>
      </Card>
      {isSheetOpen && (
        <MissionCompleteSheet
          onConfirm={handleConfirm}
          onCancel={handleSheetCancel}
        />
      )}
    </>
  );
};

export const MyMissionList = () => {
  const { data: missions = [] } = useMissions();

  return (
    <div className="flex gap-4">
      {missions.map((mission) => (
        <MyMissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};
