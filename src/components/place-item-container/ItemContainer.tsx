import { useRef } from 'react';
import type { ItemContainerProps } from './model/type';
import PlaceItemCard from '../place-item-card/PlaceItemCard';

const ItemContainer = ({ title, items }: ItemContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const cardWidth = 430;
  const placeCardPadding = 12 * 2;
  const gap = 16;

  const totalCardWidth = cardWidth + placeCardPadding + gap;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -totalCardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: totalCardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl py-15 text-left">
      <div className="relative z-20 px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold"> {title} </h2>
        </div>
        <div className="relative">
          <div ref={scrollRef} className="flex gap-x-4 overflow-x-hidden py-2">
            {items.map((item) => (
              <PlaceItemCard
                key={item.placeInfo.placeId}
                placeInfo={item.placeInfo}
                className={'flex-none'}
              />
            ))}
          </div>
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md"
          >
            {'<'}
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md"
          >
            {'>'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemContainer;
