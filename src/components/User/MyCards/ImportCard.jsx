import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { images } from "../../../utils";
import { useUserData } from "../../../context/UserDataContext";
import YellowButton from "../../YellowButton";
import { apiGetPublicAddresses } from "../../../services/apiGetPublicAddresses";
import { apiImportCard } from "../../../services/apiImportCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/AuthContext";

const ImportCard = () => {
  const { t } = useTranslation();
  const { cards, originalCards, refreshCards } = useUserData();
  const cardImage = images?.[originalCards.length]?.cardImage;
  const [focusedInput, setFocusedInput] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const saveImportedCard = async () => {
    try {
      const publicAddress = await apiGetPublicAddresses({
        privateKey1: privateKey,
      });
      const result = await apiImportCard(user.id, publicAddress.privateKey1);
      await AsyncStorage.setItem(
        `privateKey${originalCards.length + 1}fromUser${user.id}`,
        privateKey
      );
      if (result) {
        alert(t("card_imported_successfully"));
      }
      await refreshCards();
      navigate("/myCards");
    } catch (error) {
      alert(t("invalid_private_key"));
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.firstRow}>
          <TouchableOpacity onPress={() => navigate("/myCards")}>
            <Image source={require("../../../../assets/backButton.png")} />
          </TouchableOpacity>
          <Text style={styles.colorWhite}>{t("import_card")}</Text>
        </View>
        <View>
          <Image
            style={styles.cardToEdit}
            source={cardImage}
            resizeMode="contain"
          />
          <Text style={styles.editText}>
            {cards?.[0]?.name == null ? "Tarjeta digital" : cards?.[0]?.name}
          </Text>
        </View>
        <View style={styles.downContainer}>
          <TextInput
            placeholderTextColor={"#c1c1c1"}
            style={[
              styles.inputText,
              focusedInput === "privateKey" && styles.focusedInput,
            ]}
            placeholder={t("private_key")}
            onFocus={() => setFocusedInput("privateKey")}
            onChangeText={(text) => setPrivateKey(text)}
            value={privateKey}
          />
          <YellowButton
            green={true}
            label={t("confirm")}
            onPress={saveImportedCard}
          />
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
    gap: 25,
    marginRight: 25,
  },
  mainContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  cardToEdit: {
    width: "100%",
  },
  bgGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 20,
  },
  lightText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  numberText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "start",
    letterSpacing: -1,
    marginTop: 10,
    fontWeight: "bold",
    width: "80%",
  },
  line: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#a77827",
    marginTop: 20,
    marginBottom: 20,
  },
  cardDataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRowLabel: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  cardRowValue: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  columnContainer: {
    width: "50%",
    paddingTop: 15,
    gap: 10,
  },
  editIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  editText: {
    position: "absolute",
    bottom: 31,
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "CovesBold",
    width: "100%",
  },
  publicAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputText: {
    height: 75,
    width: "100%",
    backgroundColor: "#282828",
    borderRadius: 40,
    fontFamily: "CovesBold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 30,
    color: "#c1c1c1",
    paddingHorizontal: 20,
  },
  focusedInput: {
    borderColor: "#F1A539",
    borderWidth: 2,
  },
  downContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImportCard;
