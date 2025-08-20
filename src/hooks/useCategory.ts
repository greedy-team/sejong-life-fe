import { useContext } from 'react';
import { CategoryContext } from '../context/categoryContext';

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error(
      'useCategory 훅은 CategoryProvider 내부에서만 사용해야 합니다.',
    );
  }

  return context;
};
