import type { Meta, StoryObj } from '@storybook/nextjs';
import { userEvent, within } from 'storybook/test';

import { Mission } from '@/entities/missions/model/mission.types';
import { MyMissionCard } from '@/features/missions/my-mission-list';
import { TodayMissionCard } from '@/features/missions/today-mission-list';

import { Card } from './card';

// ────────────────────────────────────────
// Mock data
// ────────────────────────────────────────

const normalMission: Mission = {
  id: '1',
  title: '구름 사진 찍기',
  categoryId: '2',
  categoryName: '자연/힐링',
  image: '',
  completedCount: 23,
  createdAt: '2025-05-03',
  updatedAt: '2025-05-03',
  isSpecial: false,
};

const specialMission: Mission = {
  id: '2',
  title: '별 보러 옥상 가기',
  categoryId: '2',
  categoryName: '우주/자연',
  image: '',
  completedCount: 5,
  createdAt: '2025-05-03',
  updatedAt: '2025-05-03',
  isSpecial: true,
};

// ────────────────────────────────────────
// Meta
// ────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ────────────────────────────────────────
// 오늘의 미션 카드 (TodayMissionCard)
// ────────────────────────────────────────

/** 일반 미션 앞면 */
export const TodayDefault: Story = {
  name: '오늘의 미션 — 앞면 (일반)',
  render: () => <TodayMissionCard mission={normalMission} />,
};

/** 히든 미션 앞면 */
export const TodaySpecial: Story = {
  name: '오늘의 미션 — 앞면 (히든)',
  render: () => <TodayMissionCard mission={specialMission} />,
};

/** 일반 미션 뒷면 */
export const TodayFlipped: Story = {
  name: '오늘의 미션 — 뒷면 (일반)',
  render: () => <TodayMissionCard mission={normalMission} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.firstElementChild as HTMLElement);
  },
};

/** 일반 미션 뒷면 + 선택된 상태 */
export const TodayFlippedSelected: Story = {
  name: '오늘의 미션 — 뒷면 + 선택됨 (일반)',
  render: () => <TodayMissionCard mission={normalMission} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement.firstElementChild as HTMLElement);
    const selectBtn = await canvas.findByRole('button', { name: '선택하기' });
    await userEvent.click(selectBtn);
  },
};

/** 히든 미션 뒷면 */
export const TodaySpecialFlipped: Story = {
  name: '오늘의 미션 — 뒷면 (히든)',
  render: () => <TodayMissionCard mission={specialMission} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(canvasElement.firstElementChild as HTMLElement);
  },
};

/** 히든 미션 뒷면 + 선택된 상태 */
export const TodaySpecialFlippedSelected: Story = {
  name: '오늘의 미션 — 뒷면 + 선택됨 (히든)',
  render: () => <TodayMissionCard mission={specialMission} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement.firstElementChild as HTMLElement);
    const selectBtn = await canvas.findByRole('button', { name: '선택하기' });
    await userEvent.click(selectBtn);
  },
};

// ────────────────────────────────────────
// 나의 미션 카드 (MyMissionCard)
// ────────────────────────────────────────

/** 일반 미션 — 완료 전 */
export const MyMissionDefault: Story = {
  name: '나의 미션 — 완료 전 (일반)',
  render: () => <MyMissionCard mission={normalMission} />,
};

/** 히든 미션 — 완료 전 */
export const MyMissionSpecial: Story = {
  name: '나의 미션 — 완료 전 (히든)',
  render: () => <MyMissionCard mission={specialMission} />,
};

/** 일반 미션 — 완료 확인 바텀 시트 열림 */
export const MyMissionSheet: Story = {
  name: '나의 미션 — 완료 바텀 시트',
  render: () => <MyMissionCard mission={normalMission} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const completeBtn = await canvas.findByRole('button', { name: '완료하기' });
    await userEvent.click(completeBtn);
  },
};

/** 일반 미션 — 완료 후 배경 채움 애니메이션 */
export const MyMissionCompleted: Story = {
  name: '나의 미션 — 완료 후 (일반)',
  render: () => <MyMissionCard mission={normalMission} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const completeBtn = await canvas.findByRole('button', { name: '완료하기' });
    await userEvent.click(completeBtn);
    const confirmBtn = await canvas.findByRole('button', { name: '완료' });
    await userEvent.click(confirmBtn);
  },
};

/** 히든 미션 — 완료 후 배경 채움 애니메이션 */
export const MyMissionSpecialCompleted: Story = {
  name: '나의 미션 — 완료 후 (히든)',
  render: () => <MyMissionCard mission={specialMission} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const completeBtn = await canvas.findByRole('button', { name: '완료하기' });
    await userEvent.click(completeBtn);
    const confirmBtn = await canvas.findByRole('button', { name: '완료' });
    await userEvent.click(confirmBtn);
  },
};
