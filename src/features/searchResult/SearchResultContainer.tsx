import SearchBar from '../../components/share/SearchBar';
import SearchResultItems from './SearchResultItems';

const SearchResultContainer = () => {
  return (
    <>
      <div className="mx-auto flex w-[90%] flex-col justify-center py-10 sm:w-[75%]">
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <SearchResultItems />
      </div>
    </>
  );
};

export default SearchResultContainer;
