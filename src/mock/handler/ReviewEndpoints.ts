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
