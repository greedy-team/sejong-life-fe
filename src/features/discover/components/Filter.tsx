import { useEffect, useState } from 'react';
import fetchCategories from '../apis/filterApi';
import type { CategoryProps } from '../model/type';
import CategoryFilter from './CategoryFilter';

const Filter = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data);
    };

    fetchCategory();
  }, []);

  return (
    <div className="w-full">
      <CategoryFilter categories={categories} />
    </div>
  );
};

export default Filter;
