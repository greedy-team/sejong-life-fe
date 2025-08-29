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
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MjVfMjgz%2FMDAxNzQ1NTEwMDExMzE3.fvoMulzVSMo08z9fSy0pdbTtTB4IERcVBpCYizC4j6kg.BBfZu1bS8LpRmnB3brwyWY8kMUsFau-Vzts6s1Wk6X8g.PNG%2F7.png&type=a340',
      categories: [{ categoryId: 1, categoryName: '식당' }],
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
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MDVfMjg2%2FMDAxNzE3NTYxMjQ1MzM5.d02btha4jL7zbgMpZ10uPqNsDDwZHDCzzhEEpbeaIM8g.ShyiYxLutUvaoxYHESm5KM9o0euYGsyArqY3BnMdaJ8g.JPEG%2F0.jpg&type=a340',
      categories: [{ categoryId: 2, categoryName: '카페' }],
      tags: [
        {
          tagId: 3,
          tagName: '콘센트가 있는',
        },
      ],
    },
    {
      placeId: 3,
      placeName: 'mock3',
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDRfMTU2%2FMDAxNjU2OTMxMzcyMDk2.0FbfiI5SGnrhUBG6LMcHZFGbiG6_mqnlXr_gWGH0dkIg.5w-arGwT2Bn0PsFmtfVg81iEA9YjpCEgScF-DCw8cnAg.JPEG.rim-com4604%2FIMG_1624.jpg&type=a340',
      categories: [{ categoryId: 1, categoryName: '식당' }],
      tags: [
        {
          tagId: 1,
          tagName: '자고 싶다',
        },
        {
          tagId: 2,
          tagName: '야작 그만',
        },
      ],
    },
    {
      placeId: 4,
      placeName: 'mock4',
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MDVfMjg2%2FMDAxNzE3NTYxMjQ1MzM5.d02btha4jL7zbgMpZ10uPqNsDDwZHDCzzhEEpbeaIM8g.ShyiYxLutUvaoxYHESm5KM9o0euYGsyArqY3BnMdaJ8g.JPEG%2F0.jpg&type=a340',
      categories: [{ categoryId: 2, categoryName: '카페' }],
      tags: [
        {
          tagId: 3,
          tagName: '콘센트가 있는',
        },
      ],
    },
    {
      placeId: 5,
      placeName: 'mock5',
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMjNfMjkz%2FMDAxNzMyMzQ3Njk3MDA5.87N1jY3N83RzmToo8DyB5vWGPDseM-yHF65HrbUjitog.asMFw-uEGajRSko-zih-FPUG98yFxQnJMGLbUuaCJYMg.JPEG%2FIMG_8441.JPG&type=a340',
      categories: [{ categoryId: 1, categoryName: '식당' }],
      tags: [
        {
          tagId: 1,
          tagName: '자고 싶다',
        },
        {
          tagId: 2,
          tagName: '야작 그만',
        },
      ],
    },
    {
      placeId: 6,
      placeName: 'mock6',
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMjNfMjkz%2FMDAxNzMyMzQ3Njk3MDA5.87N1jY3N83RzmToo8DyB5vWGPDseM-yHF65HrbUjitog.asMFw-uEGajRSko-zih-FPUG98yFxQnJMGLbUuaCJYMg.JPEG%2FIMG_8441.JPG&type=a340',
      categories: [{ categoryId: 2, categoryName: '카페' }],
      tags: [
        {
          tagId: 3,
          tagName: '콘센트가 있는',
        },
      ],
    },
    {
      placeId: 7,
      placeName: 'mock7',
      mainImageUrl:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMjNfMjkz%2FMDAxNzMyMzQ3Njk3MDA5.87N1jY3N83RzmToo8DyB5vWGPDseM-yHF65HrbUjitog.asMFw-uEGajRSko-zih-FPUG98yFxQnJMGLbUuaCJYMg.JPEG%2FIMG_8441.JPG&type=a340',
      categories: [{ categoryId: 1, categoryName: '식당' }],
      tags: [
        {
          tagId: 1,
          tagName: '자고 싶다',
        },
        {
          tagId: 2,
          tagName: '야작 그만',
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
            category: { categoryId: '2', categoryName: '카페' },
            images: [
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MjVfMjgz%2FMDAxNzQ1NTEwMDExMzE3.fvoMulzVSMo08z9fSy0pdbTtTB4IERcVBpCYizC4j6kg.BBfZu1bS8LpRmnB3brwyWY8kMUsFau-Vzts6s1Wk6X8g.PNG%2F7.png&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MDVfMjg2%2FMDAxNzE3NTYxMjQ1MzM5.d02btha4jL7zbgMpZ10uPqNsDDwZHDCzzhEEpbeaIM8g.ShyiYxLutUvaoxYHESm5KM9o0euYGsyArqY3BnMdaJ8g.JPEG%2F0.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDlfNTAg%2FMDAxNzQ0MTg4MTY4NTAz.ouTG9RpQLDyrl7FTCWbRBPxzc4NWAJDcOufY-X1ff64g.j8SrsGQxjmq-a2dgSsEZOp4N6v0tnlx0x7D1GU3KwRcg.JPEG%2F900%25A3%25DF1744188153898.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MDRfMTU2%2FMDAxNjU2OTMxMzcyMDk2.0FbfiI5SGnrhUBG6LMcHZFGbiG6_mqnlXr_gWGH0dkIg.5w-arGwT2Bn0PsFmtfVg81iEA9YjpCEgScF-DCw8cnAg.JPEG.rim-com4604%2FIMG_1624.jpg&type=a340',
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMjNfMjkz%2FMDAxNzMyMzQ3Njk3MDA5.87N1jY3N83RzmToo8DyB5vWGPDseM-yHF65HrbUjitog.asMFw-uEGajRSko-zih-FPUG98yFxQnJMGLbUuaCJYMg.JPEG%2FIMG_8441.JPG&type=a340',
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
