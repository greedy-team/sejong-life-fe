import { useEffect, useState } from 'react';
import fetchCategories from '../apis/filterApi';
import type { CategoryProps } from '../model/type';

const Filter = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchCategories();
      setCategories(res.data);
    };

    fetchCategory();
  }, []);

  return <></>;
};

export default Filter;
