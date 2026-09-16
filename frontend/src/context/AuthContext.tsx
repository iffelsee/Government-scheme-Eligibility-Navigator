
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('scheme_navigator_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('scheme_navigator_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('scheme_navigator_user');
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    setUser({
      id: 'usr_' + Date.now(),
      name: name || email.split('@')[0] || 'Citizen User',
      email,
      state: 'Andhra Pradesh',
      casteCategory: 'General',
      occupation: 'Student',
    });
  };

  const register = (name: string, email: string) => {
    setUser({
      id: 'usr_' + Date.now(),
      name,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
