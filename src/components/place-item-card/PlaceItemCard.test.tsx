import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PlaceItemCard from './PlaceItemCard';

describe('장소 아이템 카드 컴포넌트', () => {
  it('아이템 카드 내에 장소 이미지, 장소명, 카테고리, 태그가 모두 렌더링되어야 한다.', () => {
    const mockPlaceInfo = {
      placeId: 1,
      placeName: '그리디 카페',
      mainPhotoUrl: '/asset/place-item-card/tempImg.svg',
      categories: [
        { categoryId: 1, categoryName: '식당' },
        { categoryId: 2, categoryName: '카페' },
      ],
      tags: [
        { tagId: 1, tagName: '가성비' },
        { tagId: 7, tagName: '공부하기 좋은' },
      ],
    };
    render(<PlaceItemCard placeInfo={mockPlaceInfo} />);

    const thumbnailImage = screen.getByRole('img', {
      name: '장소 대표 이미지',
    });
    expect(thumbnailImage).toBeInTheDocument();

    const placeNameElement = screen.getByText(mockPlaceInfo.placeName);
    expect(placeNameElement).toBeInTheDocument();

    mockPlaceInfo.categories.forEach((category) => {
      const categoryElement = screen.getByText(category.categoryName);
      expect(categoryElement).toBeInTheDocument();
    });

    mockPlaceInfo.tags.forEach((tag) => {
      const tagElement = screen.getByText(tag.tagName);
      expect(tagElement).toBeInTheDocument();
    });
  });
});
