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
            placeName: '그리디 카페',
            images: [
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MjVfMjgz%2FMDAxNzQ1NTEwMDExMzE3.fvoMulzVSMo08z9fSy0pdbTtTB4IERcVBpCYizC4j6kg.BBfZu1bS8LpRmnB3brwyWY8kMUsFau-Vzts6s1Wk6X8g.PNG%2F7.png&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MDVfMjg2%2FMDAxNzE3NTYxMjQ1MzM5.d02btha4jL7zbgMpZ10uPqNsDDwZHDCzzhEEpbeaIM8g.ShyiYxLutUvaoxYHESm5KM9o0euYGsyArqY3BnMdaJ8g.JPEG%2F0.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDRfMTU2%2FMDAxNjU2OTMxMzcyMDk2.0FbfiI5SGnrhUBG6LMcHZFGbiG6_mqnlXr_gWGH0dkIg.5w-arGwT2Bn0PsFmtfVg81iEA9YjpCEgScF-DCw8cnAg.JPEG.rim-com4604%2FIMG_1624.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMjJfMzYg%2FMDAxNjc5NDk1MjQyNDM1.i_-9xON5Xs1B0moAh2JbM1WaUUb1N-bThc8kjqfPaHIg.W5dMOi4zY40w4BHsitme8w8xzf9_6tvchY5EVfT2FqMg.JPEG.rin_725%2FIMG_8507.JPG&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA3MTVfMjIg%2FMDAxNzIxMDQ3MjE3ODI0.WY6HcIo4XRWZ3PPINabp-b8gSJFPvgA_NWlNhr9Q77Eg.9pmEIsPjDs1YyKOlnslrKHuouso8qV-ni7Ie5vi499Ag.JPEG%2FIMG_1646.JPG&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA0MjBfMjg5%2FMDAxNTg3MzE4MzE3MzI1.vHdts-9zSH5YgRmP1oU3WauTNyKhgt8XK0rj_Ke4wecg.N8U0uYqMszqfTY60MGq5VW04sxhaIRCaqX1Bbb9RMkkg.JPEG.tongue_tech_%2F%25B9%25F6%25C5%25CD6.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDAxMjdfMjc4%2FMDAxNTgwMTAyMzk1NjAx.tsgOPtAwr5WnhlIbiepZBXg81s2doD7HdT-RhzCiLL0g.xLpjmsl0WXmKDWKbDjMBOBO3pRRaaQt_wRFxC3AV9Dwg.JPEG.skrhdwn2496%2FIMG_2226.jpg&type=a340',
            ],
            tags: [
              { tagId: 1, tagName: '가성비' },
              { tagId: 2, tagName: '카공' },
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
