import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/shared/api/base-url.constant';

export const handlers = [
  http.get(`${BASE_URL}/api/category`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '취미/창작',
        image: '/images/category/category_hobby.png',
      },
      {
        id: 2,
        name: '스터디/성장',
        image: '/images/category/category_study.png',
      },
      {
        id: 3,
        name: '도전/탐험',
        image: '/images/category/category_challenge.png',
      },
      {
        id: 4,
        name: '운동/건강',
        image: '/images/category/category_exercise.png',
      },
      {
        id: 5,
        name: '관계/휴식',
        image: '/images/category/category_relationship.png',
      },
      {
        id: 6,
        name: '자연/힐링',
        image: '/images/category/category_heal.png',
      },
    ]);
  }),
];
