import ExploreItem from '../features/explore/components/ExploreItem';
import Filter from '../features/explore/components/Filter';

const ExplorePage = () => {
  return (
    <div className="mx-auto flex w-[90%] flex-col justify-center py-10 sm:w-[75%]">
      <Filter />
      <ExploreItem />
    </div>
  );
};

export default ExplorePage;
