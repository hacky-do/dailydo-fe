import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mission } from '@/entities/missions/model/mission.types';
import { BASE_URL } from '@/shared/api/base-url.constant';

import { Card } from './card';

const fetchMissions = async (): Promise<Mission[]> => {
  const res = await fetch(`${BASE_URL}/api/missions/new`);
  return res.json();
};

// MSW 핸들러 데이터 기준:
// missions[0]: 구름 사진 찍기, 자연/힐링, isSpecial: false, completedCount: 23
// missions[2]: 별 보러 옥상 가기, 히든 미션, isSpecial: true
let missions: Mission[];

beforeEach(async () => {
  missions = await fetchMissions();
});

describe('카드 컴포넌트', () => {
  test('앞면 요소들이 렌더링된다', () => {
    render(<Card {...missions[0]} />);

    expect(screen.getByText('오늘의 미션')).toBeInTheDocument();
    expect(screen.getByText('탭해서 확인하기')).toBeInTheDocument();
  });

  test('초기 상태는 뒤집히지 않은 상태다', () => {
    const { container } = render(<Card {...missions[0]} />);
    const inner = container.querySelector('[data-flipped]')!;

    expect(inner).toHaveAttribute('data-flipped', 'false');
  });

  test('클릭 시 카드가 뒤집힌다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);
    const inner = container.querySelector('[data-flipped]')!;

    await user.click(container.firstChild as HTMLElement);

    expect(inner).toHaveAttribute('data-flipped', 'true');
  });

  test('두 번 클릭 시 카드가 원래 상태로 돌아온다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);
    const inner = container.querySelector('[data-flipped]')!;

    await user.click(container.firstChild as HTMLElement);
    await user.click(container.firstChild as HTMLElement);

    expect(inner).toHaveAttribute('data-flipped', 'false');
  });
});

describe('카드가 뒤집힌 상태일 경우', () => {
  test('뒤집힌 후 미션 제목과 카테고리가 표시된다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);

    await user.click(container.firstChild as HTMLElement);

    expect(screen.getByText(missions[0].title)).toBeInTheDocument();
    expect(screen.getByText(missions[0].categoryName)).toBeInTheDocument();
  });

  test('히든 미션이면 뒤집힌 후 히든 미션 카테고리명이 표시된다', async () => {
    const user = userEvent.setup();
    const hiddenMission = missions[2];
    const { container } = render(<Card {...hiddenMission} />);

    await user.click(container.firstChild as HTMLElement);

    expect(screen.getByText(hiddenMission.categoryName)).toBeInTheDocument();
  });

  test('일반 미션이면 히든 미션 카테고리가 표시되지 않는다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);

    await user.click(container.firstChild as HTMLElement);

    expect(screen.queryByText('히든 미션')).not.toBeInTheDocument();
  });

  test('선택하기 클릭 시 완료 수와 취소하기가 표시된다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);

    await user.click(container.firstChild as HTMLElement);
    await user.click(screen.getByRole('button', { name: '선택하기' }));

    expect(
      screen.getByText(`${missions[0].completedCount}명이 완료했어요`),
    ).toBeInTheDocument();
    expect(screen.getByText('취소하기')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '선택하기' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '넘기기' }),
    ).not.toBeInTheDocument();
  });

  test('취소하기 클릭 시 선택이 해제되고 카드가 앞면으로 돌아온다', async () => {
    const user = userEvent.setup();
    const { container } = render(<Card {...missions[0]} />);
    const inner = container.querySelector('[data-flipped]')!;

    await user.click(container.firstChild as HTMLElement);
    await user.click(screen.getByRole('button', { name: '선택하기' }));
    await user.click(screen.getByText('취소하기'));

    expect(inner).toHaveAttribute('data-flipped', 'false');
    expect(screen.queryByText('취소하기')).not.toBeInTheDocument();
    expect(
      screen.queryByText(`${missions[0].completedCount}명이 완료했어요`),
    ).not.toBeInTheDocument();
  });
});
