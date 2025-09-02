import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AdminUser } from '../types/admin';

interface AdminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AdminContext: Checking for existing session...');
    // Check for existing session
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AdminContext: Found stored user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AdminContext: Error parsing stored user:', error);
        localStorage.removeItem('admin_user');
      }
    } else {
      console.log('AdminContext: No stored user found');
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { username, password });
    try {
      // Mock authentication - in real app, this would be an API call
      if (username === 'admin' && password === 'admin123') {
        console.log('Login successful, creating admin user...');
        const adminUser: AdminUser = {
          id: '1',
          username: 'admin',
          email: 'admin@travelsite.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          permissions: [
            'manage_destinations',
            'manage_photos',
            'manage_hotels',
            'manage_users',
            'manage_flight_margins',
            'view_analytics'
          ]
        };
        
        console.log('Setting user in context:', adminUser);
        setUser(adminUser);
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        console.log('User saved to localStorage');
        return true;
      }
      console.log('Login failed: invalid credentials');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  console.log('AdminContext: Current state:', { user, isAuthenticated: !!user, loading });

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
