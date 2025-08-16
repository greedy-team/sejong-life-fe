import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { TagProvider } from '../../../context/tagContext';
import TagFilter from './TagFilter';

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

describe('TagFilter Component', () => {
  test('태그를 성공적으로 불러오고 렌더링해야 합니다.', async () => {
    render(
      <TagProvider>
        <TagFilter />
      </TagProvider>,
    );

    // API 호출
    await waitFor(() => {
      // 모킹 데이터의 태그들이 화면에 표시되는지 확인
      expect(screen.getByText('가성비')).toBeInTheDocument();
      expect(screen.getByText('조용한')).toBeInTheDocument();
    });
  });

  test('태그를 클릭하면 선택 상태가 변경되어야 합니다.', async () => {
    render(
      <TagProvider>
        <TagFilter />
      </TagProvider>,
    );

    const user = userEvent.setup();

    // 초기 상태에서 가성비는 선택되지 않았음을 확인
    const costTag = await screen.findByText('가성비');
    expect(costTag).not.toHaveClass('opacity-100');

    // 가성비를 클릭
    await user.click(costTag);

    // 클릭 후 가성비가 선택되었음을 확인
    expect(costTag).toHaveClass('opacity-100');

    // 이전에 선택되었던 가성비를 다시 클릭했을 때 해제 됨을 확인
    await user.click(costTag);
    expect(costTag).not.toHaveClass('opacity-100');
  });
});
