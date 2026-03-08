import { http, HttpResponse } from 'msw';

export const putPlace = http.put(
  '/sejonglife/api/places/:placeId',
  async ({ params }) => {
    const { placeId } = params;

    if (!placeId) {
      return HttpResponse.json(
        {
          errorCode: 'MISSING_REQUIRED_PARAMETER',
          message: '필수 파라미터(placeId)가 누락되었습니다.',
          data: null,
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        message: '장소 수정 성공',
        data: {},
      },
      { status: 200 },
    );
  },
);
