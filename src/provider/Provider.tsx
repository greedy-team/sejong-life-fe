import type { ReactNode } from 'react';
import { CategoryProvider } from '../context/categoryContext';
import { TagProvider } from '../context/tagContext';
import { AuthProvider } from '../context/userContext';
import { QueryProvider } from './QueryProvider';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <CategoryProvider>
          <TagProvider>{children}</TagProvider>
        </CategoryProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
