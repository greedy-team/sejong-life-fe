import { useContext } from 'react';
import { TagContext } from '../context/tagContext';

export const useTag = () => {
  const context = useContext(TagContext);

  if (context === undefined) {
    throw new Error('useTag 훅은 TagProvider 내부에서만 사용해야 합니다.');
  }

  return context;
};
