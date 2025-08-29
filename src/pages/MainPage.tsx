import { useEffect, useState } from 'react';
import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import type { PlaceItemCardProps } from '../components/place-item-card/model/type';
import PageRouterButton from '../components/share/PageRouterButton';
import Footer from '../layout/components/Footer';

// ------------ mocking Data---------------- API 구현 후 지워야 함
interface PlaceApiData {
  placeId: number;
  placeName: string;
  mainImageUrl: string;
  tags: { tagId: number; tagName: string }[];
  categories?: { categoryId: number; categoryName: string }[];
}

const MainPage = () => {
  const [hotPlaces, setHotPlaces] = useState<PlaceItemCardProps[]>([]);

  useEffect(() => {
    const fetchHotPlaces = async () => {
      try {
        const response = await fetch('/sejonglife/api/places?category=추천');
        const result = await response.json();

        if (response.ok) {
          const transformedData: PlaceItemCardProps[] = result.data.map(
            (item: PlaceApiData) => ({
              placeInfo: {
                placeId: item.placeId,
                placeName: item.placeName,
                mainImageUrl: item.mainImageUrl,
                categories: item.categories,
                tags: item.tags,
              },
            }),
          );
          setHotPlaces(transformedData);
        } else {
          console.error('API Error:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchHotPlaces();
  }, []);
  // ------------ mocking Data----------------

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Banner />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px',
          }}
        >
          <PageRouterButton
            to="/discover"
            icon="/asset/pageRouterButton/allItemIcon.svg"
          >
            <div>전체</div>
          </PageRouterButton>
          <PageRouterButton
            to="/discover"
            icon="/asset/pageRouterButton/restaurantIcon.svg"
          >
            <div>식당</div>
          </PageRouterButton>
          <PageRouterButton
            to="/discover"
            icon="/asset/pageRouterButton/cafeIcon.svg"
          >
            <div>카페</div>
          </PageRouterButton>
          <PageRouterButton
            to="/preparingService"
            icon="/asset/pageRouterButton/rouletteIcon.svg"
          >
            <div>룰렛</div>
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
