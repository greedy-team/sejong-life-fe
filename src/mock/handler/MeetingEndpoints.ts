import { http, HttpResponse } from 'msw';

const API_BASE = 'https://api.sejonglife.site';

const mockProfiles = [
  {
    id: 1,
    kakaoId: 'kakao_1',
    gender: 'FEMALE',
    faceType: 'CAT',
    birthYear: 2001,
    hobby: '독서, 요가',
    dateStyle:
      '집에서 같이 요리하기 성수동 팝업스토어 오픈런 같이하기 한강에서 자전거타기',
    createdAt: '2025-05-17T10:00:00',
  },
  {
    id: 2,
    kakaoId: 'kakao_2',
    gender: 'FEMALE',
    faceType: 'FOX',
    birthYear: 2003,
    hobby: '그림, 영화',
    dateStyle: '미술관 데이트',
    createdAt: '2025-05-17T11:00:00',
  },
  {
    id: 3,
    kakaoId: 'kakao_3',
    gender: 'MALE',
    faceType: 'BEAR',
    birthYear: 1999,
    hobby: '운동, 요리',
    dateStyle: '한강 피크닉',
    createdAt: '2025-05-17T12:00:00',
  },
  {
    id: 4,
    kakaoId: 'kakao_4',
    gender: 'MALE',
    faceType: 'DOG',
    birthYear: 2002,
    hobby: '음악, 게임',
    dateStyle: '야경 드라이브',
    createdAt: '2025-05-17T13:00:00',
  },
  {
    id: 5,
    kakaoId: 'kakao_5',
    gender: 'FEMALE',
    faceType: 'RABBIT',
    birthYear: 2004,
    hobby: '사진, 산책',
    dateStyle: '빈티지 카페 탐방',
    createdAt: '2025-05-17T14:00:00',
  },
  {
    id: 6,
    kakaoId: 'kakao_6',
    gender: 'MALE',
    faceType: 'DEER',
    birthYear: 2000,
    hobby: '독서, 클라이밍',
    dateStyle: '북카페에서 독서',
    createdAt: '2025-05-17T15:00:00',
  },
];

const mockContacts: Record<number, string> = {
  1: '010-1234-5678',
  2: '@fox_girl_2003',
  3: '010-9876-5432',
  4: '@music_lover_02',
  5: '@bunny.photo',
  6: '010-5555-7777',
};

let availableOpenCount = 1;
let bonusOpenCount = 0;
const cooldownRemainingSeconds = 3540;
const viewedProfileIds = new Set<number>();

export const getMeetingProfiles = http.get(
  `${API_BASE}/api/meeting/profiles`,
  () => {
    return HttpResponse.json(mockProfiles, { status: 200 });
  },
);

export const getMeetingOpenCount = http.get(
  `${API_BASE}/api/meeting/profiles/open-count`,
  () => {
    return HttpResponse.json(
      {
        message: '열람권 현황 조회 성공',
        data: {
          availableOpenCount,
          bonusOpenCount,
          cooldownRemainingSeconds,
        },
      },
      { status: 200 },
    );
  },
);

export const postMeetingSignup = http.post(
  `${API_BASE}/api/meeting/auth/signup`,
  () => {
    return HttpResponse.json(
      {
        message: '회원가입 성공',
        data: {
          accessToken: 'mock-access-token',
          signUpToken: null,
          userInfo: { studentId: '20200000', name: '홍길동' },
          newUser: false,
        },
      },
      { status: 200 },
    );
  },
);

export const openMeetingCard = http.post(
  `${API_BASE}/api/meeting/profiles/:profileId/open`,
  ({ params }) => {
    const profileId = Number(params.profileId);
    const contact = mockContacts[profileId];

    if (!contact) {
      return HttpResponse.json(
        { message: '존재하지 않는 프로필입니다.' },
        { status: 404 },
      );
    }

    if (viewedProfileIds.has(profileId)) {
      return HttpResponse.json(
        { contact, alreadyViewed: true },
        { status: 200 },
      );
    }

    if (availableOpenCount + bonusOpenCount <= 0) {
      return HttpResponse.json(
        { message: '카드 오픈 횟수를 모두 사용했습니다.' },
        { status: 403 },
      );
    }

    if (availableOpenCount > 0) {
      availableOpenCount -= 1;
    } else {
      bonusOpenCount -= 1;
    }
    viewedProfileIds.add(profileId);

    return HttpResponse.json(
      { contact, alreadyViewed: false },
      { status: 200 },
    );
  },
);
