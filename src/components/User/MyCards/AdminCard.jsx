import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { apiUpdateCard } from "../../../services/apiUpdateCard";
import { useUserData } from "../../../context/UserDataContext";

const CustomizeCard = () => {
  const { t } = useTranslation();
  const [cardName, setCardName] = useState();
  const { card } = useParams();
  const [cardParsed, setCardParsed] = useState();
  const navigate = useNavigate();
  const { refreshCards } = useUserData();

  useEffect(() => {
    setCardParsed(JSON.parse(card));
    setCardName(
      JSON.parse(card)?.name == null
        ? t("digital_card")
        : JSON.parse(card)?.name
    );
  }, []);

  const updateCard = async (isFrozen) => {
    const card = {
      id: cardParsed?.id,
      isFrozen: isFrozen,
    };
    const result = await apiUpdateCard(card);
    result.status == 200 ? alert(t("card_updated")) : alert(t("update_error"));
    await refreshCards();
    navigate("/myCards");
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.firstRow}>
          <TouchableOpacity onPress={() => navigate("/myCards")}>
            <Image source={require("../../../../assets/backButton.png")} />
          </TouchableOpacity>
          <Text style={styles.colorWhite}>{t("manage")}</Text>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.cardContainer}>
            {cardParsed?.isFrozen ? (
              <>
                <Text style={styles.lightText}>{t("your_card_frozen")}</Text>
                <Image source={require("../../../../assets/redLogo.png")} />
              </>
            ) : (
              <>
                <Text style={styles.lightText}>{t("your_card_active")}</Text>
                <Image source={require("../../../../assets/greenLogo.png")} />
              </>
            )}
          </View>
          <View>
            <Image
              style={styles.cardToEdit}
              source={cardParsed?.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.boldTextInside}>{cardName}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => updateCard(true)}>
              <LinearGradient
                colors={["#1F1B17", "#FF1F00"]}
                style={styles.buttonGradient}
                start={[1, 0]}
                end={[0, 1]}
              >
                <Text style={styles.buttonText}>{t("freeze_card")}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateCard(false)}>
              <LinearGradient
                colors={["#1F1B17", "#3EE459"]}
                style={styles.buttonGradient}
                start={[1, 0]}
                end={[0, 1]}
              >
                <Text style={styles.buttonText}>{t("unfreeze_card")}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  colorWhite: {
    color: "#fff",
    fontSize: 28,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
    marginRight: 60,
  },
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  cardToEdit: {
    width: "100%",
  },
  lightText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  boldTextInside: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "CovesBold",
    position: "absolute",
    top: "70%",
    width: "100%",
  },
  inputText: {
    height: 75,
    width: "100%",
    backgroundColor: "#282828",
    borderRadius: 40,
    fontFamily: "CovesBold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
    color: "#c1c1c1",
    marginBottom: 300,
  },
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
  buttonGradient: {
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 12,
    height: 48,
    marginTop: 12,
    width: 240,
  },
  buttonText: {
    fontFamily: "CovesBold",
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: "20%",
  },
  centerContainer: {
    marginTop: "20%",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
});

export default CustomizeCard;
