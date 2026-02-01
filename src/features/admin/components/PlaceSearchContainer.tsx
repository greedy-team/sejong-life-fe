import AdminSearchBar from './AdminSearchBar';
import AdminSearchResultItems from './AdminSearchResultItems';

const PlaceSearchContainer = () => {
  return (
    <>
      <div className="mx-auto flex w-[80%] flex-col justify-center py-10">
        <div className="flex justify-center">
          <AdminSearchBar />
        </div>
        <AdminSearchResultItems />
      </div>
    </>
  );
};

export default PlaceSearchContainer;
