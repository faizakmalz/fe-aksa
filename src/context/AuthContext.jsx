import { createContext, useContext, useEffect, useState } from 'react';
import STATIC_USERS from '../helpers/users';

const AuthContext = createContext();

const AUTH_KEY = 'myapp_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username, password) => {
    const foundUser = STATIC_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password, ...userData } = foundUser;
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    console.log(foundUser, user, 'USERSSSDSDS')
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const updateProfile = (name, address, phone) => {
    if (!user) return;
    const updated = { ...user, name, address, phone };
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
