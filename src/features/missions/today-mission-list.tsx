'use client';

import Image from 'next/image';

import { useGetTodayMissions } from '@/entities/missions/api/use-get-missions';
import { Mission } from '@/entities/missions/model/mission.types';
import { useMissionCardState } from '@/entities/missions/model/use-mission-card-state';
import {
  categoryBadgeStyles,
  getMissionSelectionVariant,
  titleStyles,
} from '@/features/missions/mission-card.styles';
import { MissionCardFront } from '@/features/missions/mission-card-front';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';
import { Card } from '@/widgets/card';
import { useCard } from '@/widgets/card/card-context';

interface TodayMissionBackContentProps {
  mission: Mission;
  selected: boolean;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSkip: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodayMissionBackContent = ({
  mission,
  selected,
  onSelect,
  onSkip,
  onCancel,
}: TodayMissionBackContentProps) => {
  const { isSpecial } = useCard();
  const selectionVariant = getMissionSelectionVariant(selected, isSpecial);

  return (
    <>
      <span
        className={cn(
          'rounded-2xl px-2 py-1 text-xs font-normal',
          categoryBadgeStyles[selectionVariant],
        )}
      >
        {mission.categoryName}
      </span>
      <p
        className={cn(
          'text-center text-xl font-semibold [word-break:auto-phrase]',
          titleStyles[selectionVariant],
        )}
      >
        {mission.title}
      </p>
      <Image
        src={mission.image || '/mocks/images/test_image.png'}
        alt={mission.title}
        width={80}
        height={80}
        className="rounded-full object-cover"
      />
      <div
        className={cn(
          '-mt-3 grid transition-all duration-300',
          selected
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <span className="overflow-hidden text-xs font-semibold text-gray-600">
          {`${mission.completedCount}명이 미션에 도전중이에요!`}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
        {selected ? (
          <Button variant="tertiary" size="md" onClick={onCancel} type="button">
            취소하기
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={onSkip}
              type="button"
            >
              넘기기
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={onSelect}
              type="button"
            >
              선택하기
            </Button>
          </>
        )}
      </div>
    </>
  );
};

interface TodayMissionCardProps {
  mission: Mission;
  onSelect?: (id: string) => void;
  onSkip?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const TodayMissionCard = ({
  mission,
  onSelect,
  onSkip,
  onCancel,
}: TodayMissionCardProps) => {
  const { selected, select, cancel } = useMissionCardState();

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    select();
    onSelect?.(mission.id);
  };

  const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSkip?.(mission.id);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cancel();
    onCancel?.(mission.id);
  };

  return (
    <Card isSpecial={mission.isSpecial}>
      <Card.Front>
        <MissionCardFront />
      </Card.Front>
      <Card.Back selected={selected}>
        <TodayMissionBackContent
          mission={mission}
          selected={selected}
          onSelect={handleSelect}
          onSkip={handleSkip}
          onCancel={handleCancel}
        />
      </Card.Back>
    </Card>
  );
};

export const TodayMissionList = () => {
  const { data: missions = [] } = useGetTodayMissions();

  return (
    <div className="flex gap-4">
      {missions.map((mission) => (
        <TodayMissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};
