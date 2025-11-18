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
      case '생활/문화':
        return (
          <img src="/asset/pageRouterButton/lifeIcon.svg" alt="생활/문화" />
        );
      case '쇼핑':
        return (
          <img src="/asset/pageRouterButton/shoppingIcon.svg" alt="쇼핑" />
        );
      case '식당':
        return (
          <img src="/asset/pageRouterButton/restaurantIcon.svg" alt="식당" />
        );
      case '여가':
        return <img src="/asset/pageRouterButton/leisureIcon.svg" alt="여가" />;
      case '카페':
        return <img src="/asset/pageRouterButton/cafeIcon.svg" alt="카페" />;
      default:
        return '';
    }
  };
  return (
    <div>
      <div className="mx-auto flex grid w-[90%] grid-cols-3 justify-center gap-x-4 gap-y-2 sm:w-[70%] md:w-[50%] lg:w-[80%] lg:grid-cols-6">
        {categories.map((category) => (
          <button
            key={category.categoryId}
            className={`lg:text-m relative z-10 flex h-[46px] w-[100px] shrink-0 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-colors duration-100 hover:scale-105 lg:w-[120px] ${isSelected(category) ? 'bg-gray-200' : 'bg-gray-100'} `}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex shrink-0 items-center gap-1">
              {getEmoji(category.categoryName)}
              <span className="shrink-0">{category.categoryName}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
