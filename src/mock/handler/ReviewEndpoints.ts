import { http, HttpResponse } from 'msw';

export const getReviewStats = http.get(
  '/sejonglife/api/places/:placeId/reviews/summary',
  ({ params }) => {
    const { placeId } = params;
    const mockReviewStats = {
      reviewCount: 10,
      averageRate: 4.3,
      ratingDistribution: {
        '5': 3,
        '4': 5,
        '3': 1,
        '2': 1,
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
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMzFfMTUy%2FMDAxNjc1MTM1NDkyNjcz.A582PyJHvoRO8lKE8Ri3FPLghkGfAar42Mu9kw9WeYsg.HiLMoSYNRcnqV8J_0RlwAfqCcormP-iXtsfCfl2rXJkg.JPEG.gotsla_0505%2FIMG_6898.jpg&type=a340',
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMjg5%2FMDAxNjg1NDYxNzI4NjYy.mPJDvCIfgJ9WxN84RXqsnVitIAWq6HXCkxY19LpPhn4g.gM2LpfoQeGCLcCVhSzUZJwYBGMjEoW1sQZrhboZySfgg.JPEG.mimibus74%2Foutput_2844177903.jpg&type=a340',
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
