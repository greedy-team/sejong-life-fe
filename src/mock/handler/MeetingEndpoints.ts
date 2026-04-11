import { http, HttpResponse } from 'msw';

const API_BASE = 'https://api.sejonglife.site';

const mockProfiles = [
  {
    id: 1,
    gender: '여',
    faceType: '고양이상',
    birthYear: 2001,
    hobby: '독서, 요가',
    desiredDate: '카페에서 조용한 대화',
    selfAppeal: '조용하고 감성적인 편이에요',
    remainPickCount: 5,
  },
  {
    id: 2,
    gender: '여',
    faceType: '여우상',
    birthYear: 2003,
    hobby: '그림, 영화',
    desiredDate: '미술관 데이트',
    selfAppeal: '예술을 좋아해요',
    remainPickCount: 3,
  },
  {
    id: 3,
    gender: '남',
    faceType: '곰상',
    birthYear: 1999,
    hobby: '운동, 요리',
    desiredDate: '한강 피크닉',
    selfAppeal: '활동적이고 따뜻해요',
    remainPickCount: 4,
  },
  {
    id: 4,
    gender: '남',
    faceType: '강아지상',
    birthYear: 2002,
    hobby: '음악, 게임',
    desiredDate: '야경 드라이브',
    selfAppeal: '신나고 재밌어요',
    remainPickCount: 5,
  },
  {
    id: 5,
    gender: '여',
    faceType: '토끼상',
    birthYear: 2004,
    hobby: '사진, 산책',
    desiredDate: '빈티지 카페 탐방',
    selfAppeal: '소소한 것을 좋아해요',
    remainPickCount: 2,
  },
  {
    id: 6,
    gender: '남',
    faceType: '사슴상',
    birthYear: 2000,
    hobby: '독서, 클라이밍',
    desiredDate: '북카페에서 독서',
    selfAppeal: '차분하고 진지해요',
    remainPickCount: 3,
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

let remainOpenCount = 1;

export const getMeetingProfiles = http.get(
  `${API_BASE}/meeting/profiles`,
  () => {
    return HttpResponse.json(mockProfiles, { status: 200 });
  },
);

export const postMeetingProfile = http.post(
  `${API_BASE}/meeting/profiles`,
  () => {
    return HttpResponse.json(
      { id: 99, message: '프로필이 등록되었습니다.' },
      { status: 201 },
    );
  },
);

export const openMeetingCard = http.post(
  `${API_BASE}/meeting/profiles/:profileId/open`,
  ({ params }) => {
    if (remainOpenCount <= 0) {
      return HttpResponse.json(
        { message: '카드 오픈 횟수를 모두 사용했습니다.' },
        { status: 403 },
      );
    }

    const profileId = Number(params.profileId);
    const contact = mockContacts[profileId];

    if (!contact) {
      return HttpResponse.json(
        { message: '존재하지 않는 프로필입니다.' },
        { status: 404 },
      );
    }

    remainOpenCount -= 1;

    return HttpResponse.json({ contact, remainOpenCount }, { status: 200 });
  },
);
