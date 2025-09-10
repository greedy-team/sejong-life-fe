import type { StoryObj } from '@storybook/react-vite';

import PlaceItemCard from './PlaceItemCard';

const meta = {
  component: PlaceItemCard,
  title: 'Components/PlaceItemCard',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlaceItemCard>;

const mockPlaceInfo = {
  placeId: 1,
  placeName: '그리디 카페',
  mainImageUrl: '/asset/place-item-card/tempImg.svg',
  categories: [
    { categoryId: 1, categoryName: '식당' },
    { categoryId: 2, categoryName: '카페' },
  ],
  tags: [
    { tagId: 1, tagName: '가성비' },
    { tagId: 7, tagName: '공부하기 좋은' },
  ],
  reviewCount: 4,
  viewCount: 30,
};

export const Default: Story = {
  args: {
    placeInfo: mockPlaceInfo,
  },
};
