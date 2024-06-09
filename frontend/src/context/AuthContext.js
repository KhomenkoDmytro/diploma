import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [institutionId, setInstitutionId] = useState(null);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/admin-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setIsAuth(true);
      setInstitutionId(decodedToken.institution_id);
      fetchUserData(decodedToken.user.id); // прибрано await, оскільки useEffect не підтримує асинхронні функції напряму

    } else {
      setIsAuth(false);
      setInstitutionId(null);
    }
  }, []);

  

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    Cookies.set('token', token, { expires: 7 });
    setIsAuth(true);
    setInstitutionId(decodedToken.institution_id);
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuth(false);
    setInstitutionId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, institutionId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
