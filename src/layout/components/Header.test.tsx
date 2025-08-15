import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Header 컴포넌트 테스트
describe('Header 컴포넌트', () => {
  it('로고, "홈" 링크, "탐색" 링크가 모두 렌더링되어야 한다', () => {
    // BrowserRouter로 Header 컴포넌트를 감싸서, Link 컴포넌트가 정상 동작하도록 설정
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // 1. 로고 이미지 검증
    // alt 속성을 사용해 이미지를 찾기
    const logoImage = screen.getByRole('img', { name: '로고 이미지' });
    expect(logoImage).toBeInTheDocument();

    // 2. "홈" 링크 검증
    // "홈"이라는 텍스트를 가진 링크를 찾기
    const homeLink = screen.getByRole('link', { name: '홈' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/'); // 올바른 경로를 가리키는지 확인

    // 3. "탐색" 링크 검증
    // "탐색"이라는 텍스트를 가진 링크를 찾기
    const discoverLink = screen.getByRole('link', { name: '탐색' });
    expect(discoverLink).toBeInTheDocument();
    expect(discoverLink).toHaveAttribute('href', '/discover'); // 올바른 경로를 가리키는지 확인
  });
});
