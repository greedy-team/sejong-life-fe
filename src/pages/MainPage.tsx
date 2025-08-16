import { useEffect, useState } from 'react';
import Banner from '../components/place-item-container/Banner';
import ItemContainer from '../components/place-item-container/ItemContainer';
import type { PlaceItemCardProps } from '../components/place-item-card/model/type';

// ------------ mocking Data---------------- API 구현 후 지워야 함
interface PlaceApiData {
  placeId: number;
  placeName: string;
  mainPhotoUrl: string;
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
                mainPhotoUrl: item.mainPhotoUrl,
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
        <ItemContainer title="🔥 Hot Places" items={hotPlaces} />
        <ItemContainer
          title="🍝 🍣 세종대 근처 중식, 일식 추천"
          items={hotPlaces}
        />
        <ItemContainer title="🥝 2기 프로젝트 파이팅" items={hotPlaces} />
      </div>
    </>
  );
};

export default MainPage;
