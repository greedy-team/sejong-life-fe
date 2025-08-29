import ExploreItem from '../features/explore/components/ExploreItem';
import Filter from '../features/explore/components/Filter';

const ExplorePage = () => {
  return (
    <div className="flex flex-col px-[15%] py-10">
      <div className="w-full">
        <Filter />
        <ExploreItem />
      </div>
    </div>
  );
};

export default ExplorePage;
