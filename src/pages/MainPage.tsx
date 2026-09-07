import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import PageRouterButton from '../components/share/PageRouterButton';
import Spinner from '../components/share/Spinner';
import Footer from '../layout/components/Footer';
import { useCategoryLists } from '../features/explore/hooks/queries';
import { useHotPlaces } from '../features/main/hooks';
import SearchBar from '../components/share/SearchBar';
import { useNavigate } from 'react-router-dom';
import MapNavigateButton from '../components/share/MapNavigateButton';

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
  const navigate = useNavigate();

  const categoryNameByLabel = (name: string) =>
    categories.find((c) => c.categoryName === name)?.categoryName ?? name;

  if (isCategoriesLoading || isHotPlacesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full overflow-x-hidden">
        {/* <MeetingBanner /> */}
        <Banner />
        <div className="flex justify-center">
          <SearchBar />
        </div>

        {/* 7개를 4열 2행(4+3)으로 배치한다. flex-wrap이던 때는 버튼이
            88px 고정이라 375px에서 3+3+1로 끊겨 마지막 하나가 외톨이였다.
            max-w-md는 4열이 데스크톱에서 화면 끝까지 벌어지지 않게 잡는다. */}
        <div className="mx-auto grid max-w-md grid-cols-4 justify-items-center gap-3 px-4 pt-4 sm:gap-5">
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
      <div className="bottom-fab fixed left-1/2 z-50 -translate-x-1/2">
        <MapNavigateButton onClick={() => navigate('/map')} />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
