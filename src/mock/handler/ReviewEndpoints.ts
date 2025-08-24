import { http, HttpResponse } from 'msw';

export const getReviewDetail = http.get(
  '/sejonglife/api/places/:placeId/reviews',
  () => {
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
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
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

    return HttpResponse.json(
      {
        message: '리뷰 목록 조회 성공',
        data: mockReviews,
      },
      { status: 200 },
    );
  },
);
