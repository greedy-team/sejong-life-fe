import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import PageRouterButton from '../components/share/PageRouterButton';
import Spinner from '../components/share/Spinner';
import Footer from '../layout/components/Footer';
import { useCategoryLists } from '../features/explore/hooks/queries';
import { useHotPlaces } from '../features/main/hooks';
import SearchBar from '../components/share/SearchBar';

const MainPage = () => {
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategoryLists();
  const { data: hotPlacesData, isLoading: isHotPlacesLoading } = useHotPlaces();

  const hotPlaces = hotPlacesData?.data || [];

  if (isCategoriesLoading || isHotPlacesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Banner />
        <div className="flex justify-center">
          <SearchBar />
        </div>

        <div className="flex flex-wrap justify-center gap-5 pt-10">
          <PageRouterButton
            to={`/explore?category=${'전체'}`}
            icon="/asset/pageRouterButton/allItemIcon.svg"
          >
            <span>전체</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[0]?.categoryName}`}
            icon="/asset/pageRouterButton/restaurantIcon.svg"
          >
            <span>식당</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[1]?.categoryName}`}
            icon="/asset/pageRouterButton/cafeIcon.svg"
          >
            <span>카페</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[2]?.categoryName}`}
            icon="/asset/pageRouterButton/lifeIcon.svg"
          >
            <span>생활/문화</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[3]?.categoryName}`}
            icon="/asset/pageRouterButton/shoppingIcon.svg"
          >
            <span>쇼핑</span>
          </PageRouterButton>

          <PageRouterButton
            to={`/explore?category=${categories[4]?.categoryName}`}
            icon="/asset/pageRouterButton/leisureIcon.svg"
          >
            <span>여가</span>
          </PageRouterButton>

          <PageRouterButton
            to={`/roulette`}
            icon="/asset/pageRouterButton/rouletteIcon.svg"
          >
            <span>룰렛</span>
          </PageRouterButton>
        </div>
        <div className="mt-10 mb-8 border-b border-gray-100" />
        <ItemContainer
          iconSrc="/asset/itemContainer/hotPlaceIcon.svg"
          title="Hot Places"
          items={hotPlaces}
        />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
