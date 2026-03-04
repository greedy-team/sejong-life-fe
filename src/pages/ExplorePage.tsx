import SearchBar from '../components/share/SearchBar';
import ExploreItem from '../features/explore/components/ExploreItem';
import Filter from '../features/explore/components/Filter';
import MapNavigateButton from '../components/share/MapNavigateButton';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto mb-10 flex w-[90%] flex-col justify-center sm:w-[75%]">
      <div className="mb-10 flex justify-center">
        <SearchBar />
      </div>
      <Filter />
      <ExploreItem />

      <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
        <MapNavigateButton onClick={() => navigate('/map')} />
      </div>
    </div>
  );
};

export default ExplorePage;
