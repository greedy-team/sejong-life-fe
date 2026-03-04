import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import PageRouterButton from '../components/share/PageRouterButton';
import Spinner from '../components/share/Spinner';
import Footer from '../layout/components/Footer';
import { useCategoryLists } from '../features/explore/hooks/queries';
import { useHotPlaces } from '../features/main/hooks';
import SearchBar from '../components/share/SearchBar';

const menus = [
  {
    label: '전체',
    icon: '/asset/pageRouterButton/allItemIcon.svg',
    category: '전체',
  },
  {
    label: '식당',
    icon: '/asset/pageRouterButton/restaurantIcon.svg',
    category: '식당',
  },
  {
    label: '카페',
    icon: '/asset/pageRouterButton/cafeIcon.svg',
    category: '카페',
  },
  {
    label: '생활/문화',
    icon: '/asset/pageRouterButton/lifeIcon.svg',
    category: '생활/문화',
  },
  {
    label: '쇼핑',
    icon: '/asset/pageRouterButton/shoppingIcon.svg',
    category: '쇼핑',
  },
  {
    label: '여가',
    icon: '/asset/pageRouterButton/leisureIcon.svg',
    category: '여가',
  },
];

const MainPage = () => {
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategoryLists();
  const { data: hotPlacesData, isLoading: isHotPlacesLoading } = useHotPlaces();

  const hotPlaces = hotPlacesData?.data || [];

  const categoryNameByLabel = (name: string) =>
    categories.find((c) => c.categoryName === name)?.categoryName ?? name;

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
          {menus.map((m) => (
            <PageRouterButton
              key={m.label}
              to={`/explore?category=${encodeURIComponent(categoryNameByLabel(m.category))}`}
              icon={m.icon}
            >
              <span>{m.label}</span>
            </PageRouterButton>
          ))}

          <PageRouterButton
            to="/roulette"
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
