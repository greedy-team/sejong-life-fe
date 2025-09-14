import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { toast } from 'react-toastify';

// --- 기본 데이터 (색상 팔레트) ---
const defaultColors: string[] = [
  '#FFDDC1',
  '#FFABAB',
  '#FFC3A0',
  '#FF677D',
  '#D4A5A5',
  '#A2B29F',
  '#A3C1AD',
  '#D5B4B4',
  '#E6C7C7',
  '#F5E1E1',
  '#FAF3F3',
  '#84A59D',
  '#F28482',
  '#F5CAC3',
  '#F7EDE2',
  '#F6BD60',
  '#F57C00',
];

// --- 타입 정의 ---
type Place = { name: string; id?: number };

interface RouletteProps {
  items: Place[];
  colors: string[];
}

interface CategorySelectorProps {
  restaurants: Place[];
  cafes: Place[];
  allPlaces: Place[];
  isLoading: boolean;
  error: string | null;
  onToggleItem: (item: Place) => void;
  currentItems: Place[];
}

interface AllPlacesResponse {
  places: {
    placeId: number;
    placeName: string;
  }[];
}

// --- 룰렛 그리기 함수 ---
const drawRoulette = (
  ctx: CanvasRenderingContext2D,
  items: Place[],
  itemColors: string[],
) => {
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const arc = items.length > 0 ? (2 * Math.PI) / items.length : 0;
  const fontSize = Math.max(14, Math.floor(radius / 10));
  ctx.font = `bold ${fontSize}px 'Pretendard', sans-serif`;

  items.forEach((item, i) => {
    const angle = arc * i - Math.PI / 2;
    const nextAngle = arc * (i + 1) - Math.PI / 2;

    ctx.beginPath();
    ctx.fillStyle = itemColors[i % itemColors.length];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, nextAngle);
    ctx.closePath();
    ctx.fill();

    ctx.save();
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textAngle = angle + arc / 2;
    const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
    const textY = centerY + Math.sin(textAngle) * (radius * 0.65);

    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.fillText(item.name, 0, 0);
    ctx.restore();
  });

  ctx.strokeStyle = '#E0E0E0';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
};

// --- 컴포넌트 ---

const Roulette: React.FC<RouletteProps> = ({ items, colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<Place | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const size = Math.min(width, 500);
      canvas.width = size;
      canvas.height = size;
      drawRoulette(ctx, items, colors);
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [items, colors]);

  const handleSpin = () => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'none';
    canvas.style.transform = 'rotate(0deg)';
    canvas.getBoundingClientRect();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      const arc = 360 / items.length;
      const rotateDeg = 1800 + 360 - arc * randomIndex - arc / 2;
      canvas.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
      canvas.style.transform = `rotate(${rotateDeg}deg)`;

      setTimeout(() => {
        setResult(items[randomIndex]);
        setIsSpinning(false);
      }, 4000);
    }, 10);
  };

  const handleGoToReview = () => {
    if (result && result.id) {
      navigate(`/detail/${result.id}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center"
    >
      <div className="relative aspect-square w-full">
        <div className="absolute top-[-5px] left-1/2 z-10 -translate-x-1/2">
          <img
            src="/asset/roulette/arrow.svg"
            alt="roulette arrow"
            className="h-[50px] w-10 rotate-180"
          />
        </div>
        <canvas ref={canvasRef} className="h-full w-full" />
        <button
          onClick={handleSpin}
          disabled={isSpinning || items.length < 2}
          className="absolute top-1/2 left-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-200 bg-white text-xl font-bold text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          SPIN
        </button>
      </div>
      {result && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="animate-pop-in w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
            <p className="mb-2 text-lg text-gray-600">오늘의 장소는?!</p>
            <h2 className="mb-6 text-4xl font-bold text-black">
              {result.name}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setResult(null)}
                className="rounded-full bg-gray-300 px-6 py-3 font-semibold text-gray-800 shadow-md transition-colors duration-300 hover:bg-gray-400"
              >
                닫기
              </button>
              {result.id && (
                <button
                  onClick={handleGoToReview}
                  className="rounded-full bg-[#8BE34A] px-6 py-3 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-green-600"
                >
                  리뷰 보러가기
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  restaurants,
  cafes,
  allPlaces,
  isLoading,
  error,
  onToggleItem,
  currentItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    '전체' | '식당' | '카페'
  >('전체');

  const categories: ('전체' | '식당' | '카페')[] = ['전체', '식당', '카페'];

  const getItemsForCategory = () => {
    switch (selectedCategory) {
      case '식당':
        return restaurants;
      case '카페':
        return cafes;
      case '전체':
      default:
        return allPlaces;
    }
  };

  const itemsToShow = getItemsForCategory();

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
        장소 추가하기
      </h3>
      <div className="mb-4 flex justify-center border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-lg font-semibold transition-colors duration-200 ${selectedCategory === category ? 'border-b-2 border-[#8BE34A] text-black' : 'text-gray-300 hover:text-gray-400'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex min-h-[100px] flex-wrap items-center justify-center gap-2">
        {isLoading && <p className="text-gray-500">목록을 불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading &&
          !error &&
          itemsToShow.map((item) => {
            const isAdded = currentItems.some((ci) => ci.name === item.name);
            return (
              <button
                key={item.name}
                onClick={() => onToggleItem(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isAdded ? 'bg-green-200 text-black' : 'bg-gray-100 text-black hover:bg-green-100'}`}
              >
                {item.name}
              </button>
            );
          })}
      </div>
    </div>
  );
};

// --- RoulettePage 컴포넌트 (메인 컨테이너) ---
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
              .map((p) => ({ name: p.placeName, id: p.placeId }))
              .sort((a, b) => a.name.localeCompare(b.name)),
          );
        }
        if (cafeData && Array.isArray(cafeData.places)) {
          setCafes(
            cafeData.places
              .map((p) => ({ name: p.placeName, id: p.placeId }))
              .sort((a, b) => a.name.localeCompare(b.name)),
          );
        }
        if (allPlacesData && Array.isArray(allPlacesData.places)) {
          setAllPlaces(
            allPlacesData.places
              .map((p) => ({ name: p.placeName, id: p.placeId }))
              .sort((a, b) => a.name.localeCompare(b.name)),
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

  const DirectInput: React.FC<{
    onAddItem: (name: string) => void;
    onRemoveItem: (item: Place) => void;
    manualItems: Place[];
  }> = ({ onAddItem, onRemoveItem, manualItems }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
      if (inputValue.trim() === '') return;
      onAddItem(inputValue.trim());
      setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    };

    return (
      <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
          직접 입력하기
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="장소명을 입력하세요"
            className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="rounded-lg bg-[#8BE34A] px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[#7dc649]"
          >
            추가
          </button>
        </div>
        {manualItems.length > 0 && (
          <div className="mt-4">
            <div className="max-h-32 space-y-2 overflow-y-scroll rounded-lg border border-gray-200 p-2">
              {manualItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-1.5"
                >
                  <span className="text-sm text-gray-800">{item.name}</span>
                  <button
                    onClick={() => onRemoveItem(item)}
                    className="font-bold text-red-500 hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

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

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Roulette items={rouletteItems} colors={rouletteColors} />
        </div>
        <div className="lg:col-span-1">
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
