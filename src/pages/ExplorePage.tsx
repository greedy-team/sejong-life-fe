import ExploreItem from '../features/explore/components/ExploreItem';
import Filter from '../features/explore/components/Filter';

const ExplorePage = () => {
  return (
    <div className="mx-auto flex w-[75%] flex-col justify-center py-20">
      <Filter />
      <ExploreItem />
    </div>
  );
};

export default ExplorePage;
