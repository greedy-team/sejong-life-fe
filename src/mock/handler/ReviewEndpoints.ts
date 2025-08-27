import { http, HttpResponse } from 'msw';

export const getReviewStats = http.get(
  '/sejonglife/api/places/:placeId/reviews/summary',
  ({ params }) => {
    const { placeId } = params;
    const mockReviewStats = {
      reviewCount: 10,
      averageRate: 4.5,
      ratingDistribution: {
        '5': 5,
        '4': 3,
        '3': 1,
        '2': 0,
        '1': 0,
      },
    };
    if (placeId === '1') {
      return HttpResponse.json(
        {
          message: '리뷰 요약 정보 조회 성공',
          data: mockReviewStats,
        },
        { status: 200 },
      );
    }
  },
);

export const getReviewDetail = http.get(
  '/sejonglife/api/places/:placeId/reviews',
  ({ params }) => {
    const { placeId } = params;
    const mockReviews = [
      {
        reviewId: 1,
        userId: 1,
        studentId: 21011111,
        rating: 4,
        content:
          '정말 맛있는 카페였어요! 크로와상이 특히 바삭하고 맛있었습니다. 인테리어도 예쁘고 직원분들도 친절하셨어요. 다음에도 또 올 예정입니다.',
        likeCount: 24,
        createdAt: '2025-08-21T14:35:50.123456',
        images: [
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
        ],

        tags: [
          { tagId: 1, tagName: '맛있어요' },
          { tagId: 2, tagName: '분위기좋음' },
          { tagId: 3, tagName: '친절해요' },
        ],
      },
      {
        reviewId: 2,
        userId: 2,
        studentId: 23011111,
        rating: 3.0,
        content: '음료는 괜찮았는데, 조금 시끄러웠어요.',
        likeCount: 5,
        createdAt: '2025-08-17T14:35:50.123456',
        images: [],
        tags: [{ tagId: 4, tagName: '가성비' }],
      },
      {
        reviewId: 3,
        userId: 3,
        studentId: 24011111,
        rating: 5,
        content: '음료와 디저트 모두 완벽했어요. 인스타 감성 가득한 곳입니다.',
        likeCount: 15,
        createdAt: '2025-08-15T14:35:50.123456',
        images: [
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MTFfMTk0%2FMDAxNjU3NTI0NjI5MDMy.ElewqtJNd6zT9CJajdy6PAfDu7kkDS2jnxje4HdtA9Yg.ZQDGW4zQfA3DDykSN2ObHYYooTlSM6vMRUNUyxX6AxIg.JPEG.qkrwngp130%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5_%25284%2529.jpg&type=a340',
        ],
        tags: [
          { tagId: 5, tagName: '인스타감성' },
          { tagId: 6, tagName: '메뉴다양' },
        ],
      },
      {
        reviewId: 4,
        userId: 4,
        studentId: 20011111,
        rating: 5,
        content: '분위기가 정말 좋아서 친구들과 수다 떨기 최고예요.',
        likeCount: 30,
        createdAt: '2025-08-10T14:35:50.123456',
        images: [],
        tags: [
          { tagId: 2, tagName: '분위기좋음' },
          { tagId: 7, tagName: '넓어요' },
        ],
      },
      {
        reviewId: 5,
        userId: 5,
        studentId: 22011111,
        rating: 5,
        content: '가격이 조금 비싸지만, 그만큼 가치가 있는 곳이에요.',
        likeCount: 12,
        createdAt: '2025-08-08T14:35:50.123456',
        images: [
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTEwMjJfMjgy%2FMDAxNTcxNzQ2MjA0NjY5.lOYZEbdj7M-_USEhENqNuPFggOKjjO8k9t0_JFkmrFEg.-OaUZ8JJAfi4ZIntsiS1O6EnjDmER7PXAX9MbKy6TRAg.JPEG.dh2619%2FIMG_2069.JPG&type=sc960_832',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMTdfNzYg%2FMDAxNzA4MTY1NDI5MDQw.jiQS_0Uz4vc5GK4OkWx4j-qMO3npZDCU2R2M4oS0jsEg.yHV0xKbesbA9YmD4yfTfssL-AuDRSUCRgYauJ7k-r5Ig.JPEG.myqnamyqna%2F20240213174203_IMG_8548.JPG&type=a340',
        ],
        tags: [{ tagId: 8, tagName: '비싸지만좋음' }],
      },
      {
        reviewId: 6,
        userId: 6,
        studentId: 21011112,
        rating: 4,
        content: '커피 맛은 평범한데, 조용해서 공부하기 좋았어요.',
        likeCount: 7,
        createdAt: '2025-08-05T14:35:50.123456',
        images: [],
        tags: [{ tagId: 9, tagName: '공부하기좋음' }],
      },

      {
        reviewId: 7,
        userId: 7,
        studentId: 20011112,
        rating: 5,
        content: '너무 친절하셔서 기분이 좋았습니다!',
        likeCount: 8,
        createdAt: '2025-08-03T14:35:50.123456',
        images: [],
        tags: [{ tagId: 3, tagName: '친절해요' }],
      },
      {
        reviewId: 8,
        userId: 8,
        studentId: 22011112,
        rating: 4,
        content: '좌석이 조금 불편했어요.',
        likeCount: 3,
        createdAt: '2025-08-01T14:35:50.123456',
        images: [],
        tags: [{ tagId: 10, tagName: '좌석불편' }],
      },
      {
        reviewId: 9,
        userId: 9,
        studentId: 24011112,
        rating: 5,
        content: '아침 일찍 가서 조용하게 잘 즐겼어요.',
        likeCount: 10,
        createdAt: '2025-07-28T14:35:50.123456',
        images: [],
        tags: [{ tagId: 11, tagName: '조용해요' }],
      },
      {
        reviewId: 10,
        userId: 10,
        studentId: 23011112,
        rating: 5,
        content: '다양한 메뉴가 있어서 좋았어요!',
        likeCount: 18,
        createdAt: '2025-07-25T14:35:50.123456',
        images: [
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160330_5%2Faksenvldia1_1459336829375vrDWk_JPEG%2FDSC02108.jpg&type=a340',
        ],
        tags: [{ tagId: 6, tagName: '메뉴다양' }],
      },
    ];

    if (placeId === '1') {
      return HttpResponse.json(
        {
          message: '리뷰 목록 조회 성공',
          data: mockReviews,
        },
        { status: 200 },
      );
    }
  },
);
