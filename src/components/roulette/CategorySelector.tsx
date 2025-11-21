import { useState, useRef, useEffect } from 'react';
import type { CategorySelectorProps } from './model/types';

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

  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    setIsBottom(atBottom);
  };

  const [isAllSelected, setIsAllSelected] = useState(false);

  //   const handleToggleItem = (item: Place) => {
  //     if (rouletteItems.some((i) => i.name === item.name)) {
  //       handleRemoveItem(item);
  //     } else {
  //       handleAddItem(item);
  //     }
  //   };

  useEffect(() => {
    const allNames = itemsToShow.map((i) => i.name);
    const selectedNames = currentItems.map((i) => i.name);

    const allIncluded =
      allNames.length > 0 &&
      allNames.every((name) => selectedNames.includes(name));

    setIsAllSelected(allIncluded);
  }, [itemsToShow, currentItems]);

  const handleAllSelected = () => {
    const all = itemsToShow;

    if (!isAllSelected) {
      all.forEach((item) => {
        const exists = currentItems.some((ci) => ci.name === item.name);
        if (!exists) onToggleItem(item);
      });
      setIsAllSelected(true);
    } else {
      all.forEach((item) => {
        const exists = currentItems.some((ci) => ci.name === item.name);
        if (exists) onToggleItem(item);
      });
      setIsAllSelected(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
      <h3 className="mb-4 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        장소 추가하기
      </h3>
      <div className="mb-4 flex justify-center border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-base font-semibold transition-colors duration-200 sm:text-lg ${selectedCategory === category ? 'border-b-2 border-[#77db30] text-black' : 'text-gray-300 hover:text-gray-400'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            data-selected={isAllSelected}
            className="flex shrink-0 cursor-pointer transition-colors duration-100 hover:scale-105"
            onClick={() => handleAllSelected()}
          >
            {isAllSelected && (
              <img
                src="/asset/explore-page/check.svg"
                alt="check"
                className="h-9 w-9 shrink-0"
              />
            )}
            {!isAllSelected && (
              <img
                src="/asset/explore-page/noneCheck.svg"
                alt="noneCheck"
                className="h-9 w-9 shrink-0"
              />
            )}
          </button>
          <span
            data-selected={isAllSelected}
            className="lg-text-xl font-semibold whitespace-nowrap text-[#354052]"
          >
            전체 선택하기
          </span>
        </div>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex max-h-[20rem] min-h-[100px] flex-wrap items-center justify-center gap-2 overflow-y-scroll"
        >
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
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${isAdded ? 'bg-[#77db30] text-white' : 'bg-gray-100 text-black hover:bg-[#E4F7D2]'}`}
                >
                  {item.name}
                </button>
              );
            })}
        </div>
        <div
          className={`pointer-events-none absolute bottom-0 left-0 h-30 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${
            isBottom ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export default CategorySelector;
