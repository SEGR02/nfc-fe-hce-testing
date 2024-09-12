import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiGetUserById } from "../services/apiGetUserById";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedUserId) {
      const userData = await apiGetUserById(storedUserId);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      console.log("USER REFRESCADO");
    }
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
