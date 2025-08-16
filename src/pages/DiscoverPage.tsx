import DiscoverItem from '../features/discover/components/DiscoverItem';
import Filter from '../features/discover/components/Filter';

const DiscoverPage = () => {
  return (
    <div className="flex flex-col px-[15%] py-10">
      <div className="w-full">
        <Filter />
        <DiscoverItem />
      </div>
    </div>
  );
};

export default DiscoverPage;
