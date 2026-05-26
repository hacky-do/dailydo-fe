import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useRef } from 'react';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    id: '1',
    title: '구름 사진 찍기',
    categoryId: '2',
    categoryName: '자연/힐링',
    image: '',
    completedCount: 23,
    createdAt: '2025-05-03',
    updatedAt: '2025-05-03',
    isSpecial: false,
  },
  argTypes: {
    id: { control: false },
    categoryId: { control: false },
    image: { control: false },
    createdAt: { control: false },
    updatedAt: { control: false },
    title: { control: 'text' },
    categoryName: { control: 'text' },
    completedCount: { control: 'number' },
    isSpecial: { control: 'inline-radio', options: [true, false] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 앞면
export const Default: Story = {};

// 히든 미션 앞면
export const HiddenMission: Story = {
  args: {
    isSpecial: true,
    title: '별 보러 옥상 가기',
    categoryName: '자연/힐링',
    completedCount: 5,
  },
};

const withFlipped = (story: Story): Story => ({
  ...story,
  render: (args) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      ref.current?.firstElementChild?.dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      );
    }, []);

    return (
      <div ref={ref}>
        <Card {...args} />
      </div>
    );
  },
});

// 뒷면
export const Flipped: Story = withFlipped({});

// 히든 미션 뒷면
export const HiddenMissionFlipped: Story = withFlipped({
  args: {
    isSpecial: true,
    title: '별 보러 옥상 가기',
    categoryName: '자연/힐링',
    completedCount: 5,
  },
});
