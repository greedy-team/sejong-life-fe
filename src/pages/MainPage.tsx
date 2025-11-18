import { useEffect, useState } from 'react';
import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import type { PlaceInfo } from '../components/place-item-card/model/type';
import PageRouterButton from '../components/share/PageRouterButton';
import Footer from '../layout/components/Footer';
import { fetchCategories } from '../features/explore/apis/filterApi';
import type { CategoryProps } from '../types/type';
import { fetchHotPlaces } from '../api/placeApi';

const MainPage = () => {
  const [hotPlaces, setHotPlaces] = useState<PlaceInfo[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchHotPlace = async () => {
      try {
        const response = await fetchHotPlaces();
        setHotPlaces(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchHotPlace();
  }, []);

  if (!categories || categories.length === 0) return <div>로딩중...</div>;

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Banner />
        <div className="flex justify-center gap-5 pt-10">
          <PageRouterButton
            to={`/explore?category=${'전체'}`}
            icon="/asset/pageRouterButton/allItemIcon.svg"
          >
            <span>전체</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${'생활/문화'}`}
            icon="/asset/pageRouterButton/lifeIcon.svg"
          >
            <span>생활/문화</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${'쇼핑'}`}
            icon="/asset/pageRouterButton/shoppingIcon.svg"
          >
            <span>쇼핑</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[0]?.categoryName}`}
            icon="/asset/pageRouterButton/restaurantIcon.svg"
          >
            <span>식당</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${'여가'}`}
            icon="/asset/pageRouterButton/leisureIcon.svg"
          >
            <span>여가</span>
          </PageRouterButton>
          <PageRouterButton
            to={`/explore?category=${categories[1]?.categoryName}`}
            icon="/asset/pageRouterButton/cafeIcon.svg"
          >
            <span>카페</span>
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
