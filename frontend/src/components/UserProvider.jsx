import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true); 

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/user", {
        withCredentials: true, 
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, fetchUserData, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
