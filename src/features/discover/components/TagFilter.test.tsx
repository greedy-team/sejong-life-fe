import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import CategoryFilter from './CategoryFilter';
import { CategoryProvider } from '../../../context/categoryContext';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

// 모킹 데이터 정의
const mockTags = [
  { tagId: 1, tagName: '가성비' },
  { tagId: 2, tagName: '조용한' },
];

// MSW 서버 설정
const server = setupServer(
  http.get('/sejonglife/api/tags/:categoryId', ({ params }) => {
    const { categoryId } = params;

    if (categoryId === '1') {
      return HttpResponse.json(
        {
          message: '태그 목록 조회 성공',
          data: mockTags,
        },
        { status: 200 },
      );
    }
  }),
);

// 테스트 시작 전에 서버를 활성화하고, 테스트 종료 후에 서버를 닫습니다
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
