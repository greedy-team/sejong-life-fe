import { useContext } from 'react';
import { AuthContext } from '../context/userContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용해야 합니다.');
  }

  return context;
};
