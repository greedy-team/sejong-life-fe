import { http, HttpResponse } from 'msw';

export const getCategories = http.get('/sejonglife/api/categories', () => {
  return HttpResponse.json(
    {
      message: '전체 카테고리 목록 조회 성공',
      data: [
        {
          categoryId: 1,
          categoryName: '전체',
        },
        {
          categoryId: 2,
          categoryName: '식당',
        },
        {
          categoryId: 3,
          categoryName: '카페',
        },
      ],
    },
    { status: 200 },
  );
});
