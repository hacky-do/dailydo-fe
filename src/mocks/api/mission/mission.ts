import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/shared/api/base-url.constant';

import { mockMissionItems, mockMyMissionData } from './data/missionData';

let confirmedMissionIds: number[] = [];

export const handlers = [
  // 오늘의 미션 목록 조회
  http.get(`${BASE_URL}/api/missions/new`, () => {
    return HttpResponse.json({
      data: mockMissionItems,
    });
  }),

  // 오늘의 미션 선택 확정
  http.post(`${BASE_URL}/api/missions/new`, async ({ request }) => {
    const body = (await request.json()) as { missionIds: number[] };
    confirmedMissionIds = body.missionIds ?? [];
    return HttpResponse.json(null, { status: 204 });
  }),

  // 미션 완료
  http.post(`${BASE_URL}/api/missions/:itemId`, () => {
    return HttpResponse.json(null, { status: 200 });
  }),

  // 내 미션 목록 조회
  http.get(`${BASE_URL}/api/missions`, () => {
    const items = confirmedMissionIds.length > 0
      ? mockMyMissionData.items.filter((item) =>
          confirmedMissionIds.includes(item.missionId),
        )
      : mockMyMissionData.items;
    return HttpResponse.json({
      isGuest: mockMyMissionData.isGuest,
      items,
    });
  }),
];
