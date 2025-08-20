import { useEffect, useState } from 'react';
import { useCategory } from '../../../hooks/useCategory';
import type { CategoryProps } from '../../../types/type';
import { fetchCategories } from '../apis/filterApi';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data || []);
    };

    fetchCategory();
  }, []);

  const isSelected = (category: CategoryProps) => {
    return selectedCategory?.categoryId === category.categoryId;
  };

  const handleCategoryClick = (category: CategoryProps) => {
    setSelectedCategory(category);
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
