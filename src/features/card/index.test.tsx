import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mission } from '@/entities/missions/model/mission.types';
import { BASE_URL } from '@/shared/api/base-url.constant';
import { MyMissionCard } from '@/widgets/missions/my-mission-list';
import { TodayMissionCard } from '@/widgets/missions/today-mission-list';

const fetchMissions = async (): Promise<Mission> => {
  const res = await fetch(`${BASE_URL}/api/missions/new`);
  return res.json();
};

// MSW 핸들러 데이터 기준:
// items[0]: 구름 사진 찍기, 자연/힐링, isSpecial: false, totalCompletedCount: 23
// items[2]: 별 보러 옥상 가기, 우주/자연, isSpecial: true
let missionData: Mission;

beforeEach(async () => {
  missionData = await fetchMissions();
});

describe('카드 컴포넌트', () => {
  describe('오늘의 카드 미션 목록', () => {
    test('초기 상태는 뒤집히지 않은 상태다', () => {
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} />,
      );
      const inner = container.querySelector('[data-flipped]')!;
      expect(inner).toHaveAttribute('data-flipped', 'false');
    });

    test('카드 클릭 시 data-flipped가 true로 바뀐다', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} />,
      );

      await user.click(container.firstChild as HTMLElement);

      const inner = container.querySelector('[data-flipped]')!;
      expect(inner).toHaveAttribute('data-flipped', 'true');
    });

    test('앞면 요소들이 렌더링된다 일반 미션의 경우', () => {
      render(<TodayMissionCard mission={missionData.items[0]} />);

      expect(screen.getByText('오늘의 미션')).toBeInTheDocument();
      expect(screen.getByText('탭해서 확인하기')).toBeInTheDocument();
    });

    test('앞면 요소들이 렌더링된다 히든 미션의 경우', () => {
      render(<TodayMissionCard mission={missionData.items[2]} />);

      expect(screen.getByText('스페셜 미션')).toBeInTheDocument();
      expect(screen.getByText('탭해서 확인하기')).toBeInTheDocument();
    });
  });

  describe('카드가 뒤집힌 상태일 경우', () => {
    test('뒤집힌 후 미션 제목과 카테고리가 표시와 선택하기, 넘기기 버튼 표시', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} />,
      );

      await user.click(container.firstChild as HTMLElement);

      expect(screen.getByText(missionData.items[0].title)).toBeInTheDocument();
      expect(
        screen.getByText(missionData.items[0].categoryName),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '선택하기' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '넘기기' }),
      ).toBeInTheDocument();
    });

    test('선택하기 클릭 시 도전자 수와 취소하기가 표시된다', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} />,
      );

      await user.click(container.firstChild as HTMLElement);
      await user.click(screen.getByRole('button', { name: '선택하기' }));

      expect(
        screen.getByText(
          `${missionData.items[0].totalCompletedCount}명이 미션에 도전중이에요!`,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('취소하기')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '선택하기' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '넘기기' }),
      ).not.toBeInTheDocument();
    });

    test('취소하기 클릭 시 선택이 해제되고 선택하기, 넘기기 버튼이 보인다.', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} />,
      );

      await user.click(container.firstChild as HTMLElement);
      await user.click(screen.getByRole('button', { name: '선택하기' }));
      await user.click(screen.getByText('취소하기'));

      expect(
        screen.getByRole('button', { name: '선택하기' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '넘기기' }),
      ).toBeInTheDocument();
    });

    test('넘기기 클릭 시 onSkip 콜백이 mission.missionId와 함께 호출된다', async () => {
      const user = userEvent.setup();
      const onSkip = jest.fn();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} onSkip={onSkip} />,
      );

      await user.click(container.firstChild as HTMLElement);
      await user.click(screen.getByRole('button', { name: '넘기기' }));

      expect(onSkip).toHaveBeenCalledWith(missionData.items[0].missionId);
    });

    test('선택하기 클릭 시 onSelect 콜백이 mission.missionId와 함께 호출된다', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} onSelect={onSelect} />,
      );

      await user.click(container.firstChild as HTMLElement);
      await user.click(screen.getByRole('button', { name: '선택하기' }));

      expect(onSelect).toHaveBeenCalledWith(missionData.items[0].missionId);
    });

    test('취소하기 클릭 시 onCancel 콜백이 mission.missionId와 함께 호출된다', async () => {
      const user = userEvent.setup();
      const onCancel = jest.fn();
      const { container } = render(
        <TodayMissionCard mission={missionData.items[0]} onCancel={onCancel} />,
      );

      await user.click(container.firstChild as HTMLElement);
      await user.click(screen.getByRole('button', { name: '선택하기' }));
      await user.click(screen.getByRole('button', { name: '취소하기' }));

      expect(onCancel).toHaveBeenCalledWith(missionData.items[0].missionId);
    });
  });

  describe('나의 미션 목록', () => {
    test('카드가 뒤집힌 상태로 렌더링된다', () => {
      render(<MyMissionCard mission={missionData.items[2]} />);

      const button = screen.getByRole('button', { name: '완료하기' });
      expect(button).toBeInTheDocument();
      expect(screen.getByText('히든 미션')).toBeInTheDocument();
    });

    test('일반 미션의 경우 카테고리 이름이 나온다', () => {
      render(<MyMissionCard mission={missionData.items[0]} />);
      expect(
        screen.getByText(missionData.items[0].categoryName),
      ).toBeInTheDocument();
    });

    test('히든 미션의 경우 카테고리 이름이 나오지 않고 히든 미션으로 나온다', () => {
      render(<MyMissionCard mission={missionData.items[2]} />);

      expect(screen.getByText('히든 미션')).toBeInTheDocument();
      expect(
        screen.queryByText(missionData.items[2].categoryName),
      ).not.toBeInTheDocument();
    });

    test('완료하기 클릭 시 바텀 시트 나온다', async () => {
      const user = userEvent.setup();
      render(<MyMissionCard mission={missionData.items[2]} />);

      await user.click(screen.getByRole('button', { name: '완료하기' }));

      expect(screen.getByText('미션을 완료하시겠어요?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument();
    });

    test('완료하기 클릭 후 완료 버튼 클릭 시 바텀 시트 닫힌다', async () => {
      const user = userEvent.setup();
      render(<MyMissionCard mission={missionData.items[2]} />);

      await user.click(screen.getByRole('button', { name: '완료하기' }));
      await user.click(screen.getByRole('button', { name: '완료' }));

      expect(
        screen.queryByText('미션을 완료하시겠어요?'),
      ).not.toBeInTheDocument();
    });

    test('바텀 시트에서 취소 클릭 시 시트가 닫힌다', async () => {
      const user = userEvent.setup();
      render(<MyMissionCard mission={missionData.items[2]} />);

      await user.click(screen.getByRole('button', { name: '완료하기' }));
      await user.click(screen.getByRole('button', { name: '취소' }));

      expect(
        screen.queryByText('미션을 완료하시겠어요?'),
      ).not.toBeInTheDocument();
    });

    test('완료 버튼 클릭 후 완료하기 버튼이 사라진다', async () => {
      const user = userEvent.setup();
      render(<MyMissionCard mission={missionData.items[2]} />);

      await user.click(screen.getByRole('button', { name: '완료하기' }));
      await user.click(screen.getByRole('button', { name: '완료' }));

      expect(
        screen.queryByRole('button', { name: '완료하기' }),
      ).not.toBeInTheDocument();
    });

    test('완료 버튼 클릭 후 카테고리와 제목이 표시된다', async () => {
      const user = userEvent.setup();
      render(<MyMissionCard mission={missionData.items[2]} />);

      await user.click(screen.getByRole('button', { name: '완료하기' }));
      await user.click(screen.getByRole('button', { name: '완료' }));

      expect(screen.getByText('히든 미션')).toBeInTheDocument();
      expect(screen.getByText(missionData.items[2].title)).toBeInTheDocument();
    });
  });
});
