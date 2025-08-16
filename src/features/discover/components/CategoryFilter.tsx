import { useEffect, useState } from 'react';
import { useCategory } from '../../../hooks/useCategory';
import type { CategoryProps } from '../model/type';
import { fetchCategories } from '../apis/filterApi';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data);
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
    <ul className="flex">
      {categories.map((category) => (
        <li
          key={category.categoryId}
          className={`flex h-[46px] w-[145px] cursor-pointer items-center justify-center rounded-t-2xl border border-[#dadada] font-bold transition-colors duration-100 ${isSelected(category) ? 'bg-[#F7F5F5]' : 'bg-white hover:bg-[#fdfdfd]'} `}
          onClick={() => handleCategoryClick(category)}
        >
          {category.categoryName}
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
