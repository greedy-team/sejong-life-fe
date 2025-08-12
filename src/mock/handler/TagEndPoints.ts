import { http, HttpResponse } from 'msw';

export const getTags = http.get('/sejonglife/api/tags', () => {
  return HttpResponse.json(
    {
      message: '전체 태그 목록 조회 성공',
      data: [
        { tagId: 1, tagName: '가성비' },
        { tagId: 2, tagName: '분위기 좋은' },
        { tagId: 3, tagName: '조용한' },
      ],
    },
    { status: 200 }
  );
});

export const getCategoryTags = http.get(
  '/sejonglife/api/tags/:categoryId',
  ({ params }) => {
    const { categoryId } = params;

    if (!categoryId) {
      return HttpResponse.json(
        {
          errorCode: 'MISSING_REQUIRED_PARAMETER',
          message: '필수 파라미터(category)가 누락되었습니다.',
          data: null,
        },
        { status: 400 }
      );
    }

    if (categoryId === '1') {
      return HttpResponse.json(
        {
          message: '카테고리별 태그 목록 조회 성공',
          data: [
            {
              tagId: 1,
              tagName: '가성비',
            },
            {
              tagId: 2,
              tagName: '분위기 좋은',
            },
            {
              tagId: 3,
              tagName: '조용한',
            },
          ],
        },
        { status: 200 }
      );
    }
  }
);
