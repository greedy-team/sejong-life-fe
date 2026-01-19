import AdminSearchBar from './AdminSearchBar';
import AdminSearchResultItems from './AdminSearchResultItems';

const PlaceSearchContainer = () => {
  return (
    <>
      <div className="mx-auto flex w-[90%] flex-col justify-center py-10 sm:w-[75%]">
        <div className="flex justify-center">
          <AdminSearchBar />
        </div>
        <AdminSearchResultItems />
      </div>
    </>
  );
};

export default PlaceSearchContainer;
