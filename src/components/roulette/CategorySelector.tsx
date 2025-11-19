import React, { useState } from 'react';
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
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${isAdded ? 'bg-green-200 text-black' : 'bg-gray-100 text-black hover:bg-green-100'}`}
              >
                {item.name}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default CategorySelector;
