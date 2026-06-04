'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useGetMyMissions } from '@/entities/missions/api/mission.queries';
import { MissionItem } from '@/entities/missions/model/mission.types';
import { Button } from '@/shared/ui/button/button';
import { cn } from '@/shared/utils/cn';
import { Card } from '@/widgets/card';

interface MyMissionBackContentProps {
  mission: MissionItem;
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

export const MyMissionCard = ({ mission }: { mission: MissionItem }) => {
  const [isCompleted] = useState(false);

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
    </>
  );
};

export const MyMissionList = () => {
  const { data } = useGetMyMissions();
  const missions = data?.items ?? [];

  return (
    <div className="flex gap-4">
      {missions.map((mission) => (
        <MyMissionCard key={mission.missionId} mission={mission} />
      ))}
    </div>
  );
};
