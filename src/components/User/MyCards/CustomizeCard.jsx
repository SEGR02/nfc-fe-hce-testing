import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-native";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import YellowButton from "../../YellowButton";
import { apiUpdateCard } from "../../../services/apiUpdateCard";
import { useUserData } from "../../../context/UserDataContext";

const CustomizeCard = () => {
  const { t } = useTranslation();
  const [focusedInput, setFocusedInput] = useState("");
  const [cardName, setCardName] = useState("");
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

  const updateCard = async () => {
    const card = {
      name: cardName,
      id: cardParsed?.id,
    };
    const result = await apiUpdateCard(card);
    alert(result.status == 200 ? t("card_updated") : t("update_error"));
    await refreshCards();
    navigate("/myCards");
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.firstRow}>
            <TouchableOpacity onPress={() => navigate("/myCards")}>
              <Image source={require("../../../../assets/backButton.png")} />
            </TouchableOpacity>
            <Text style={styles.colorWhite}>{t("customize")}</Text>
          </View>
          <View>
            <Image
              style={styles.cardToEdit}
              source={cardParsed?.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.boldTextInside}>{cardName}</Text>
          </View>
          <Text style={styles.lightText}>{t("change_card_name")}</Text>
          <TextInput
            placeholderTextColor={"#c1c1c1"}
            style={[
              styles.inputText,
              focusedInput === "unique" && styles.focusedInput,
            ]}
            placeholder={cardName}
            value={cardName}
            onFocus={() => setFocusedInput("unique")}
            onBlur={() => setFocusedInput("")}
            onChangeText={(e) => setCardName(e)}
          />
          <View style={styles.buttonContainer}>
            <YellowButton onPress={updateCard} label={t("continue")} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {!focusedInput && <Navbar />}
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
    top: "75%",
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
    marginBottom: "5%",
  },
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default CustomizeCard;
