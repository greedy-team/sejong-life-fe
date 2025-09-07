import type { ReactNode } from 'react';
import { CategoryProvider } from './categoryContext';
import { TagProvider } from './tagContext';
import { AuthProvider } from './userContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TagProvider>{children}</TagProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};
