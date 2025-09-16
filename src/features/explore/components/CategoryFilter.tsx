import { useEffect, useState } from 'react';
import type { CategoryProps } from '../../../types/type';
import { fetchCategories } from '../apis/filterApi';
import { useSearchParams } from 'react-router-dom';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = searchParams.get('category');
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      const categoriesWithAll = [
        { categoryId: 0, categoryName: '전체' },
        ...(res.data || []),
      ];
      setCategories(categoriesWithAll);
    };

    fetchCategory();
  }, []);

  const isSelected = (category: CategoryProps) => {
    return categoryName === category.categoryName;
  };

  const handleCategoryClick = (category: CategoryProps) => {
    setSearchParams({ category: category.categoryName });
  };

  const getEmoji = (name: string) => {
    switch (name) {
      case '전체':
        return <img src="/asset/pageRouterButton/allItemIcon.svg" alt="전체" />;
      case '식당':
        return (
          <img src="/asset/pageRouterButton/restaurantIcon.svg" alt="식당" />
        );
      case '카페':
        return <img src="/asset/pageRouterButton/cafeIcon.svg" alt="카페" />;
      default:
        return '';
    }
  };
  return (
    <div>
      <div className="mx-auto flex w-[70%] justify-center gap-3 sm:w-[80%] sm:gap-10">
        {categories.map((category) => (
          <button
            key={category.categoryId}
            className={`relative z-10 flex h-[46px] w-[120px] cursor-pointer items-center justify-center rounded-xl font-semibold transition-colors duration-100 hover:scale-105 ${isSelected(category) ? 'bg-gray-200' : 'bg-gray-100'} `}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex items-center gap-1 sm:gap-3">
              {getEmoji(category.categoryName)}
              <span>{category.categoryName}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
