import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import CategoryFilter from './CategoryFilter';
import { CategoryProvider } from '../../../context/categoryContext';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

// 모킹 데이터 정의
const mockCategories = [
  { categoryId: 1, categoryName: '식당' },
  { categoryId: 2, categoryName: '카페' },
];

// MSW 서버 설정
const server = setupServer(
  http.get('/sejonglife/api/categories', () => {
    return HttpResponse.json(
      {
        message: '전체 카테고리 목록 조회 성공',
        data: mockCategories,
      },
      { status: 200 },
    );
  }),
);

// 테스트 시작 전에 서버를 활성화하고, 테스트 종료 후에 서버를 닫습니다
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CategoryFilter Component', () => {
  test('카테고리를 성공적으로 불러오고 렌더링해야 합니다.', async () => {
    render(
      <CategoryProvider>
        <CategoryFilter />
      </CategoryProvider>,
    );

    // API 호출
    await waitFor(() => {
      // 모킹 데이터의 카테고리들이 화면에 표시되는지 확인
      expect(screen.getByText('식당')).toBeInTheDocument();
      expect(screen.getByText('카페')).toBeInTheDocument();
    });
  });

  test('초기 렌더링 시 selectedCategory의 초기값으로 설정된 카테고리를 활성화해야 합니다.', async () => {
    render(
      <CategoryProvider>
        <CategoryFilter />
      </CategoryProvider>,
    );

    const restaurantCategory = await screen.findByText('식당');
    const cafeCategory = screen.getByText('카페');

    // 식당이 초기에 선택된 상태인지 확인
    expect(restaurantCategory).toHaveClass('bg-[#F7F5F5]');
    expect(cafeCategory).not.toHaveClass('bg-[#F7F5F5]');
  });

  test('카테고리를 클릭하면 선택 상태가 변경되어야 합니다.', async () => {
    render(
      <CategoryProvider>
        <CategoryFilter />
      </CategoryProvider>,
    );

    const user = userEvent.setup();

    // 초기 상태에서 카페는 선택되지 않았음을 확인
    const cafeCategory = await screen.findByText('카페');
    expect(cafeCategory).not.toHaveClass('bg-[#F7F5F5]');

    // 카페를 클릭
    await user.click(cafeCategory);

    // 클릭 후 카페가 선택되었음을 확인
    expect(cafeCategory).toHaveClass('bg-[#F7F5F5]');

    // 이전에 선택되었던 식당이 선택 해제되었음을 확인
    const restaurantCategory = screen.getByText('식당');
    expect(restaurantCategory).not.toHaveClass('bg-[#F7F5F5]');
  });
});
