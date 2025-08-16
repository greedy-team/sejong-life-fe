import { http, HttpResponse } from 'msw';

export const getPlaces = http.get('/sejonglife/api/places', ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  if (!category) {
    return HttpResponse.json(
      {
        errorCode: 'MISSING_REQUIRED_PARAMETER',
        message: '필수 파라미터(category)가 누락되었습니다.',
        data: null,
      },
      { status: 400 },
    );
  }

  const mockPlaces = [
    {
      placeId: 1,
      placeName: '시홍쓰',
      mainPhotoUrl: 'https://example.com/shihong.jpg',
      categories: [
        {
          categoryId: 1,
          categoryName: '식당',
        },
        {
          categoryId: 2,
          categoryName: '술집',
        },
      ],
      tags: [
        {
          tagId: 1,
          tagName: '가성비',
        },
        {
          tagId: 2,
          tagName: '혼밥',
        },
      ],
    },
    {
      placeId: 2,
      placeName: '제주몰빵',
      mainPhotoUrl: 'https://example.com/caffeine.jpg',
      categories: [
        {
          categoryId: 3,
          categoryName: '카페',
        },
      ],
      tags: [
        {
          tagId: 3,
          tagName: '콘센트가 있는',
        },
      ],
    },
  ];

  return HttpResponse.json(
    {
      message: '장소 목록 조회 성공',
      data: mockPlaces,
    },
    { status: 200 },
  );
});

// 추천 장소 목록 조회는 회의 후 반영
// export const getRecommendPlaces = http.get('/sejonglife/api/places/recommend', ({themes}) => {
//   return;
// });

export const getPlaceDetails = http.get(
  '/sejonglife/api/places/:placeId',
  ({ params }) => {
    const { placeId } = params;

    if (placeId !== '1') {
      return HttpResponse.json(
        {
          errorCode: 'NOT_FOUND_PLACE',
          message: '해당하는 장소 ID를 찾을 수 없습니다.',
          data: null,
        },
        { status: 404 },
      );
    }

    if (placeId === '1') {
      return HttpResponse.json(
        {
          message: '장소 상세 정보 조회 성공',
          data: {
            placeId: 1,
            placeName: '공학관 학생 식당',
            images: [
              'https://example.com/photo1.jpg',
              'https://example.com/photo2.jpg',
              'https://example.com/photo3.jpg',
            ],
            tags: [
              { tagId: 1, tagName: '가성비' },
              { tagId: 2, tagName: '혼밥' },
              { tagId: 22, tagName: '빠르게 나옴' },
            ],
            mapLinks: {
              naverMap: 'https://map.naver.com/p/entry/place/12345',
              kakaoMap: 'https://map.kakao.com/link/to/12345',
              googleMap: 'https://goo.gl/maps/abcdefg',
            },
          },
        },
        { status: 200 },
      );
    }
  },
);
