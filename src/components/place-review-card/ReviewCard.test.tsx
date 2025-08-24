import ReviewCard from './ReviewCard';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { describe, afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

const mockReview = {
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
};

const mockReviewNoImage = {
  ...mockReview,
  images: [],
};

const server = setupServer(
  http.get('/sejonglife/api/places/:placeId/reviews', () => {
    return HttpResponse.json(
      {
        message: '해당 장소 리뷰 목록 조회 성공',
        data: mockReview,
      },
      { status: 200 },
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ReciewCard Component', () => {
  test('리뷰의 모든 필수 정보가 올바르게 렌더링 되어야 합니다.', async () => {
    render(<ReviewCard review={mockReview} />);

    await waitFor(() => {
      //닉네임(학번)
      expect(screen.getByText('21학번')).toBeInTheDocument();
      //작성날짜
      expect(screen.getByText('2025.08.21')).toBeInTheDocument();
      //텍스트 내용
      expect(screen.getByText(mockReview.content)).toBeInTheDocument();
      //별점
      const ratingElement = screen.getByTestId('review-rating');
      expect(ratingElement).toBeInTheDocument();
      //태그
      mockReview.tags.forEach((tag) => {
        expect(screen.getByText(`#${tag.tagName}`)).toBeInTheDocument();
      });
      //좋아요 수
      expect(screen.getByText('24')).toBeInTheDocument();
    });
  });

  test('리뷰에 이미지가 있는 경우 올바른 개수의 이미지를 렌더링 해야합니다.', async () => {
    render(<ReviewCard review={mockReview} />);
    await waitFor(() => {
      const reviewImages = screen.getAllByRole('img', { name: /리뷰 사진/ });
      expect(reviewImages).toHaveLength(2);
    });
  });

  test('리뷰에 이미지가 없는 경우 이미지를 영역을 렌더링하지 않아야합니다.', async () => {
    render(<ReviewCard review={mockReviewNoImage} />);
    await waitFor(() => {
      const reviewImages = screen.getAllByRole('img', { name: /리뷰 사진/ });
      expect(reviewImages).toHaveLength(0);
    });
  });
});
