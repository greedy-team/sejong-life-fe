import type { Profile } from '../../../types/meetingType';

export const meetingMockProfiles: (Profile & { position: string })[] = [
  {
    id: 1,
    faceType: 'DOG',
    gender: 'FEMALE',
    birthYear: 2004,
    dateStyle: '맛집 탐방과 산책 데이트',
    hobby: '여행, 사진찍기, 요리',
    position: 'left-[8px] top-[24px] -rotate-12',
  },
  {
    id: 2,
    faceType: 'CAT',
    gender: 'FEMALE',
    birthYear: 2005,
    dateStyle: '전시회, 영화, 그리고 와인 한 잔',
    hobby: '영화, 독서, 러닝',
    position: 'right-[-18px] top-[88px] rotate-12',
  },
  {
    id: 3,
    faceType: 'HAMSTER',
    birthYear: 2001,
    dateStyle: '애버랜드',
    gender: 'MALE',
    hobby: '쇼핑, 음악 듣기',
    position: 'left-[-28px] top-[260px] rotate-6',
  },
  {
    id: 4,
    faceType: 'DINOSOUR',
    birthYear: 1998,
    gender: 'MALE',
    dateStyle: '카페에서 수다 떨기',
    hobby: '카페, 산책',
    position: 'right-[-34px] top-[390px] -rotate-6',
  },
  {
    id: 5,
    faceType: 'DEER',
    birthYear: 2002,
    gender: 'FEMALE',
    dateStyle: '전시회, 영화 한 편',
    hobby: '독서, 러닝',
    position: 'left-[120px] top-[170px] rotate-2',
  },
];
