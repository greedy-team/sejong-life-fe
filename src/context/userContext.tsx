import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  studentId: number | null;
  setStudentId: (value: number | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState<number | null>(null);

  const decodeToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch (e) {
      return null;
    }
  };

  const isTokenExpired = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;

      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('accessToken');

      if (token && !isTokenExpired(token)) {
        setIsLoggedIn(true);
        const id = decodeToken(token);
        setStudentId(id);
      } else {
        setIsLoggedIn(false);
        setStudentId(null);
        localStorage.removeItem('accessToken');
      }
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = { isLoggedIn, setIsLoggedIn, studentId, setStudentId };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
