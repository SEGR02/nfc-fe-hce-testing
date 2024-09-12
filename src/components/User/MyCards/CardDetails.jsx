import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../../context/AuthContext";

const CardDetails = () => {
  const { t } = useTranslation();
  const [showComponent, setShowComponent] = useState();
  const { card } = useParams();
  const [cardParsed, setCardParsed] = useState();
  const [privateKey, setPrivateKey] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Chabit PIN",
    });
    if (result.success) {
      setShowComponent(true);
    } else {
      navigate("/myCards");
    }
  };

  useEffect(() => {
    handleBiometricAuth();
    setCardParsed(JSON.parse(card));
    getPrivateKey(JSON.parse(card));
  }, []);

  const getPrivateKey = async (card) => {
    if (user && card) {
      const privateKey = await AsyncStorage.getItem(
        `privateKey${card.cardImage}fromUser${user.id}`
      );
      setPrivateKey(privateKey);
    } else alert("SOMETHING WRONG");
  };

  if (showComponent)
    return (
      <>
        <View style={styles.mainContainer}>
          <View style={styles.firstRow}>
            <TouchableOpacity onPress={() => navigate("/myCards")}>
              <Image
                style={styles.backButton}
                source={require("../../../../assets/backButton.png")}
              />
            </TouchableOpacity>
            <Text style={styles.colorWhite}>{t("card_details")}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate(`/myCards/customizeCard/${card}`)}
          >
            <View>
              <Image
                style={styles.cardToEdit}
                source={cardParsed?.cardImage}
                resizeMode="contain"
              />
              <Image
                source={require("../../../../assets/editIcon.png")}
                style={styles.editIcon}
              />
              <Text style={styles.editText}>
                {cardParsed?.name == null
                  ? "Tarjeta digital"
                  : cardParsed?.name}
              </Text>
            </View>
          </TouchableOpacity>
          <LinearGradient
            colors={["#996E23", "#FFB73B"]}
            style={styles.bgGradient}
            start={[1, 1]}
            end={[0, 1]}
          >
            <Text style={styles.lightText}>{t("your_wallet")}</Text>
            <View style={styles.publicAddressContainer}>
              <Text style={styles.numberText}>{cardParsed.wallet}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(`${cardParsed.wallet}`)}
              >
                <Image
                  style={styles.copyLogo}
                  source={require("../../../../assets/copyLogo.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.lightText}>{t("your_private_key")}</Text>
            <View style={styles.publicAddressContainer}>
              <Text style={styles.numberText}>{privateKey}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(`${privateKey}`)}
              >
                <Image
                  style={styles.copyLogo}
                  source={require("../../../../assets/copyLogo.png")}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
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
    alignItems: "center",
    gap: 25,
    marginRight: 25,
    marginBottom: 20,
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
    fontSize: 17,
    textAlign: "start",
    letterSpacing: -1,
    marginTop: 10,
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
  backButton: {
    width: 35,
    height: 35,
  },
});

export default CardDetails;
