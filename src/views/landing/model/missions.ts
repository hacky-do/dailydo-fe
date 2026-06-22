export interface LandingMission {
  categoryName: string;
  title: string;
  image: string;
}

export const LANDING_MISSIONS: LandingMission[] = [
  {
    categoryName: '취미',
    title: '마음에 드는 노래 한 곡 찾아 듣기',
    image: '/category/hobby.png',
  },
  {
    categoryName: '건강',
    title: '동네 한 바퀴 가볍게 걷기',
    image: '/category/exercise.png',
  },
  {
    categoryName: '힐링',
    title: '따뜻한 차 한 잔 천천히 마시기',
    image: '/category/heal.png',
  },
  {
    categoryName: '성장',
    title: '궁금했던 단어 하나 찾아보기',
    image: '/category/study.png',
  },
  {
    categoryName: '관계',
    title: '고마운 사람에게 안부 한 줄 보내기',
    image: '/category/relationship.png',
  },
];
