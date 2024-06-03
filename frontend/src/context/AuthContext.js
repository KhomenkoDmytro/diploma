import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = () => {
    const token = Cookies.get('token');
    setIsAuth(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 7 });
    setIsAuth(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
