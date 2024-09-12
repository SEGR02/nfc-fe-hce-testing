import { useTranslation } from "react-i18next";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import SecondCarousel from "./SecondCarousel";
import YellowButton from "../../YellowButton";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCreateCard } from "../../../services/apiCreateCard";
import { useUserData } from "../../../context/UserDataContext";
import { useNavigate } from "react-router-native";
import { AntDesign } from "@expo/vector-icons";

const MyCards = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { cards, originalCards } = useUserData();
  const navigate = useNavigate();
  const { refreshCards } = useUserData();

  useEffect(() => {
    const fetchUserIdAndCards = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };
    fetchUserIdAndCards();
  }, []);

  const createCard = async () => {
    try {
      if (originalCards.length >= 3) return alert(t("card_limit"));
      const result = await apiCreateCard(userId);
      await AsyncStorage.setItem(
        `privateKey${originalCards.length + 1}fromUser${userId}`,
        result.privateKey
      );
      await refreshCards();
      alert(t("card_created_successfully"));
    } catch (error) {
      alert(t("failed_to_create_card"));
      console.error("Failed to create card", error);
    }
  };

  const importCard = () => {
    if (originalCards.length >= 3) return alert(t("card_limit"));
    navigate("/myCards/importCard");
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.firstRow}>
          <Text style={styles.colorWhite}>{t("your_cards")}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require("../../../../assets/AddLogo.png")} />
          </TouchableOpacity>
        </View>
        {cards.length > 0 ? (
          <>
            <View>
              <View style={styles.secondRow}>
                {cards?.[currentIndex]?.isFrozen ? (
                  <>
                    <Text style={styles.smallLightText}>
                      {t("your_card_frozen")}
                    </Text>
                    <Image source={require("../../../../assets/redLogo.png")} />
                  </>
                ) : (
                  <>
                    <Text style={styles.smallLightText}>
                      {t("your_card_active")}
                    </Text>
                    <Image
                      source={require("../../../../assets/greenLogo.png")}
                    />
                  </>
                )}
              </View>
              <View>
                <SecondCarousel
                  cards={cards}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <YellowButton
                onPress={() => {
                  const card = cards?.[currentIndex];
                  card.index = currentIndex;
                  navigate(`/myCards/cardDetails/${JSON.stringify(card)}`);
                }}
                label={t("card_details")}
              />
              <YellowButton link="/myCards/pinCode" label={t("pin_code")} />
              <YellowButton
                link={`/myCards/adminCard/${JSON.stringify(
                  cards?.[currentIndex]
                )}`}
                label={t("manage_card")}
              />
              <YellowButton
                link="/myCards/transactions"
                label={t("transactions")}
              />
            </View>
          </>
        ) : (
          <View style={styles.secondRow}>
            <Text style={styles.smallLightText}>{t("no_cards")}</Text>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <YellowButton onPress={createCard} label={t("create_card")} />
              <YellowButton onPress={importCard} label={t("import_card")} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  colorWhite: {
    color: "#fff",
    fontSize: 30,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: Constants.statusBarHeight + 30,
    gap: 30,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginLeft: 15,
  },
  secondRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginLeft: 15,
  },
  smallLightText: {
    color: "#fff",
    fontFamily: "CovesLight",
    fontSize: 22,
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    padding: 25,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default MyCards;
