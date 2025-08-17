import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CategoryProps } from '../features/discover/model/type';

interface CategoryContextType {
  selectedCategory: CategoryProps | null;
  setSelectedCategory: (category: CategoryProps | null) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>({
      categoryId: 1,
      categoryName: '전체',
    });
  const value = { selectedCategory, setSelectedCategory };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
