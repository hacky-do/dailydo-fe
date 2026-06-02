import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/shared/api/base-url.constant';

export const handlers = [
  http.get(`${BASE_URL}/api/missions/new`, () => {
    return HttpResponse.json({
      status: 'ARRIVED',
      isGuest: false,
      missionDate: '2025-05-03',
      minSelectableCount: 1,
      maxSelectableCount: 3,
      items: [
        {
          missionId: 1,
          title: '구름 사진 찍기',
          description: '',
          categoryId: 2,
          categoryName: '자연/힐링',
          image: '',
          totalCompletedCount: 23,
          isSpecial: false,
        },
        {
          missionId: 2,
          title: '공원에서 맨발 걷기',
          description: '',
          categoryId: 2,
          categoryName: '자연/힐링',
          image: '',
          totalCompletedCount: 15,
          isSpecial: false,
        },
        {
          missionId: 3,
          title: '별 보러 옥상 가기',
          description: '',
          categoryId: 2,
          categoryName: '우주/자연',
          image: '',
          totalCompletedCount: 5,
          isSpecial: true,
        },
        {
          missionId: 4,
          title: '오늘 점심 직접 요리하기',
          description: '',
          categoryId: 3,
          categoryName: '생활/습관',
          image: '',
          totalCompletedCount: 42,
          isSpecial: false,
        },
        {
          missionId: 5,
          title: '하루 물 2L 마시기',
          description: '',
          categoryId: 3,
          categoryName: '생활/습관',
          image: '',
          totalCompletedCount: 67,
          isSpecial: false,
        },
        {
          missionId: 6,
          title: '모르는 사람에게 먼저 인사하기',
          description: '',
          categoryId: 1,
          categoryName: '사회/관계',
          image: '',
          totalCompletedCount: 8,
          isSpecial: true,
        },
        {
          missionId: 7,
          title: '30분 독서하기',
          description: '',
          categoryId: 4,
          categoryName: '자기계발',
          image: '',
          totalCompletedCount: 31,
          isSpecial: false,
        },
      ],
    });
  }),
];
