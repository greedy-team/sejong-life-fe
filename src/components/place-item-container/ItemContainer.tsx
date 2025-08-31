import type { ItemContainerProps } from './model/type';
import PlaceItemCard from '../place-item-card/PlaceItemCard';
import { Link } from 'react-router-dom';
import LogoLoop from '../../blocks/Animations/LogoLoop/LogoLoop';

const ItemContainer = ({ title, items = [], iconSrc }: ItemContainerProps) => {
  const logoItems = items.map((item) => ({
    node: (
      <Link to={`/detail/${item.placeId}`} className="flex-none">
        <PlaceItemCard placeInfo={item} className={'flex-none'} />
      </Link>
    ),
    title: item.placeName,
  }));

  return (
    <section className="relative mx-auto w-full max-w-7xl py-4 text-left">
      <div className="relative z-20 px-4">
        <div className="mb-6 flex items-center justify-start">
          {iconSrc && <img src={iconSrc} alt="icon" className="mr-2 h-8 w-8" />}
          <h2 className="text-3xl font-bold"> {title} </h2>
        </div>
        <LogoLoop
          logos={logoItems}
          speed={60}
          direction="left"
          logoHeight={100}
          gap={8}
          pauseOnHover
          scaleOnHover
        />
      </div>
    </section>
  );
};

export default ItemContainer;
