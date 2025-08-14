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
  placeName: '시홍쓰',
  mainPhotoUrl: 'https://example.com/photo.jpg',
  categories: [
    { categoryId: 1, categoryName: '식당' },
    { categoryId: 2, categoryName: '술집' },
  ],
  tags: [
    { tagId: 1, tagName: '가성비' },
    { tagId: 7, tagName: '혼밥' },
  ],
};

export const Default: Story = {
  args: {
    placeInfo: mockPlaceInfo,
  },
};
