import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiGetCardsByUserId } from "../services/apiGetCardsByUserId";
import { images } from "../utils";
import { apiGetPublicAddresses } from "../services/apiGetPublicAddresses";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);

  const refreshCards = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        const privateKey1 = await AsyncStorage.getItem(
          `privateKey1fromUser${storedUserId}`
        );
        const privateKey2 = await AsyncStorage.getItem(
          `privateKey2fromUser${storedUserId}`
        );
        const privateKey3 = await AsyncStorage.getItem(
          `privateKey3fromUser${storedUserId}`
        );
        const validKeys = {
          privateKey1: privateKey1 || undefined,
          privateKey2: privateKey2 || undefined,
          privateKey3: privateKey3 || undefined,
        };

        const filteredKeys = Object.fromEntries(
          Object.entries(validKeys).filter(([_, v]) => v !== undefined)
        );
        const publicAddresses = await apiGetPublicAddresses(filteredKeys);
        const cards = await apiGetCardsByUserId(storedUserId);
        cards.sort((a, b) => a.id - b.id);
        for (let i = 0; i < cards.length; i++) {
          cards[i].cardImage = images[i].cardImage;
        }
        setOriginalCards(cards);
        if (publicAddresses && cards) {
          const filteredCards = cards.filter(
            (card) =>
              card.wallet === publicAddresses.privateKey1 ||
              card.wallet === publicAddresses.privateKey2 ||
              card.wallet === publicAddresses.privateKey3
          );
          filteredCards.length < cards.length ? sendNotification() : null;
          setCards(filteredCards);
          console.log("CARDS REFRESCADAS");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (!storedUserId == 2) {
      alert("You have cards to import from other device");
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
    <UserDataContext.Provider value={{ refreshCards, cards, originalCards }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
