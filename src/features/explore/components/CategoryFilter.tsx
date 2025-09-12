import { useEffect, useState } from 'react';
import type { CategoryProps } from '../../../types/type';
import { fetchCategories } from '../apis/filterApi';
import { useSearchParams } from 'react-router-dom';

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || '전체',
  );
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

  useEffect(() => {
    setSelectedCategory(categoryName || '전체');
  }, [categoryName]);

  const isSelected = (category: CategoryProps) => {
    return selectedCategory === category.categoryName;
  };

  const handleCategoryClick = (category: CategoryProps) => {
    setSelectedCategory(category.categoryName);
    setSearchParams({ category: category.categoryName });
  };

  return (
    <div className="flex select-none">
      {categories.map((category) => (
        <button
          key={category.categoryId}
          className={`relative z-10 flex h-[46px] w-[145px] cursor-pointer items-center justify-center rounded-t-2xl border border-[#dadada] font-bold transition-colors duration-100 ${isSelected(category) ? 'border-b-0 bg-[#F7F5F5]' : 'bg-white hover:bg-[#fdfdfd]'} `}
          onClick={() => handleCategoryClick(category)}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
