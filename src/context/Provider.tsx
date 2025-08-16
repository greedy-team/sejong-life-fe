import type { ReactNode } from 'react';
import { CategoryProvider } from './categoryContext';
import { TagProvider } from './tagContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CategoryProvider>
      <TagProvider>{children}</TagProvider>
    </CategoryProvider>
  );
};
