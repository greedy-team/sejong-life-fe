import SearchBar from '../components/share/SearchBar';
import ExploreItem from '../features/explore/components/ExploreItem';
import Filter from '../features/explore/components/Filter';

const ExplorePage = () => {
  return (
    <div className="mx-auto mb-10 flex w-[90%] flex-col justify-center sm:w-[75%]">
      <div className="mb-10 flex justify-center">
        <SearchBar />
      </div>
      <Filter />
      <ExploreItem />
    </div>
  );
};

export default ExplorePage;
