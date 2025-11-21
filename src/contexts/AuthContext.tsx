import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  email: string;
  name: string;
  type: 'student' | 'company';
  // Dados da empresa
  companyName?: string;
  cnpj?: string;
  phone?: string;
  website?: string;
  description?: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'student' | 'company') => boolean;
  register: (data: any, type: 'student' | 'company') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: any) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (email: string, password: string, type: 'student' | 'company') => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      type
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };
  const register = (data: any, type: 'student' | 'company') => {
    // Mock registration - in production, this would call an API
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      type,
      ...(type === 'company' && {
        companyName: data.companyName,
        cnpj: data.cnpj,
        phone: data.phone,
        website: data.website,
        description: data.description
      })
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };
  
  const updateProfile = (data: any) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    updateProfile
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}