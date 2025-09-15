import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from './../api/api';
import Roulette from './../components/roulette/Roulette';
import CategorySelector from './../components/roulette/CategorySelector';
import DirectInput from './../components/roulette/DirectInput';
import type {
  Place,
  AllPlacesResponse,
} from './../components/roulette/model/types';

const defaultColors: string[] = [
  '#FFDDC1',
  '#FFABAB',
  '#FFC3A0',
  '#D4A5A5',
  '#D5B4B4',
  '#E6C7C7',
  '#F5E1E1',
  '#FAF3F3',
  '#F5CAC3',
  '#F7EDE2',
];

const RoulettePage = () => {
  const [rouletteItems, setRouletteItems] = useState<Place[]>([]);
  const [rouletteColors, setRouletteColors] = useState<string[]>([]);
  const [manualItems, setManualItems] = useState<Place[]>([]);

  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [cafes, setCafes] = useState<Place[]>([]);
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [restaurantRes, cafeRes, allPlacesRes] = await Promise.all([
          api.get('/api/roulette/places/식당'),
          api.get('/api/roulette/places/카페'),
          api.get('/api/roulette/places/전체'),
        ]);

        const restaurantData: AllPlacesResponse = restaurantRes.data;
        const cafeData: AllPlacesResponse = cafeRes.data;
        const allPlacesData: AllPlacesResponse = allPlacesRes.data;

        if (restaurantData && Array.isArray(restaurantData.places)) {
          setRestaurants(
            restaurantData.places
              .map((place) => ({ name: place.placeName, id: place.placeId }))
              .sort((placeA, placeB) => placeA.name.localeCompare(placeB.name)),
          );
        }
        if (cafeData && Array.isArray(cafeData.places)) {
          setCafes(
            cafeData.places
              .map((place) => ({ name: place.placeName, id: place.placeId }))
              .sort((placeA, placeB) => placeA.name.localeCompare(placeB.name)),
          );
        }
        if (allPlacesData && Array.isArray(allPlacesData.places)) {
          setAllPlaces(
            allPlacesData.places
              .map((place) => ({ name: place.placeName, id: place.placeId }))
              .sort((placeA, placeB) => placeA.name.localeCompare(placeB.name)),
          );
        }
      } catch (err) {
        setError('장소 목록을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const handleAddItem = (item: Place) => {
    if (!rouletteItems.some((i) => i.name === item.name)) {
      setRouletteItems((prevItems) => [...prevItems, item]);
      setRouletteColors((prevColors) => [
        ...prevColors,
        defaultColors[rouletteItems.length % defaultColors.length],
      ]);
    }
  };

  const handleAddManualItem = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName === '') return;

    if (rouletteItems.some((i) => i.name === trimmedName)) {
      toast.error('동일한 장소명은 입력할 수 없습니다.');
      return;
    }

    const newItem: Place = { name: trimmedName };
    setManualItems((prev) => [...prev, newItem]);
    handleAddItem(newItem);
  };

  const handleRemoveItem = (itemToRemove: Place) => {
    const itemIndex = rouletteItems.findIndex(
      (i) => i.name === itemToRemove.name,
    );
    if (itemIndex > -1) {
      setRouletteItems((prevItems) =>
        prevItems.filter((i) => i.name !== itemToRemove.name),
      );
      setRouletteColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.splice(itemIndex, 1);
        return newColors;
      });
      setManualItems((prev) =>
        prev.filter((i) => i.name !== itemToRemove.name),
      );
    }
  };

  const handleToggleItem = (item: Place) => {
    if (rouletteItems.some((i) => i.name === item.name)) {
      handleRemoveItem(item);
    } else {
      handleAddItem(item);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-gray-50 p-4 font-sans sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-gray-800 sm:text-5xl">
          오늘 어디 가지?
        </h1>
        <p className="text-lg text-gray-500">
          룰렛을 돌려 오늘의 목적지를 정하세요!
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full lg:w-7/12">
          <Roulette items={rouletteItems} colors={rouletteColors} />
        </div>
        <div className="flex w-full flex-col gap-8 lg:w-5/12">
          <CategorySelector
            restaurants={restaurants}
            cafes={cafes}
            allPlaces={allPlaces}
            isLoading={isLoading}
            error={error}
            onToggleItem={handleToggleItem}
            currentItems={rouletteItems}
          />
          <DirectInput
            onAddItem={handleAddManualItem}
            onRemoveItem={handleRemoveItem}
            manualItems={manualItems}
          />
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;
