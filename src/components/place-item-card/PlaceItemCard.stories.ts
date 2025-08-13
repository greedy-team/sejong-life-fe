import type { StoryObj } from '@storybook/react-vite';

import PlaceItemCard from './PlaceItemCard';

const meta = {
  component: PlaceItemCard,
  title: 'Components/PlaceItemCard',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlaceItemCard>;

export const Default: Story = {
  args: {
    placeName: '그리디 카페',
  },
};
