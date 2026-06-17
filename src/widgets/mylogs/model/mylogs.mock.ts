import type { DayLogRecord } from './mylogs.types';

export const MOCK_DAY_LOG_RECORDS: DayLogRecord[] = [
  {
    id: '1',
    categoryId: 2,
    categoryName: '자연/힐링',
    completedCount: 1,
    title: '구름 사진 찍기',
    photo: '/mocks/images/mock1.png',
    createdAt: '2026-06-05T10:00:00',
    memo: '오늘 하늘이 정말 예뻤다.',
  },
  {
    id: '2',
    categoryId: 3,
    categoryName: '생활/습관',
    completedCount: 2,
    title: '오늘 점심 직접 요리하기',
    photo: '/mocks/images/mock3.webp',
    createdAt: '2026-06-05T12:30:00',
    memo: '',
  },
  {
    id: '3',
    categoryId: 4,
    categoryName: '자기계발',
    completedCount: 2,
    title: '30분 독서하기',
    photo: '/mocks/images/mock2.jpg',
    createdAt: '2026-06-05T21:00:00',
    memo: '오늘은 소설 한 챕터를 읽었다.',
  },
];
