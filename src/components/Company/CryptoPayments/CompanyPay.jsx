import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import CompanyNavbar from "../CompanyNavbar";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

const CompanyPay = () => {
  const { t } = useTranslation();
  const [pressedCard, setPressedCard] = useState();
  const navigate = useNavigate();
  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/companyBalance")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <Text style={styles.lightText}>{t("select_blockchain")}</Text>
        <LinearGradient
          colors={["#332D22", "#242120"]}
          style={styles.cardGradient}
          start={[1, 0]}
          end={[0, 1]}
        >
          <Pressable
            onPress={() => navigate("/companyPay/selectCrypto/1")}
            onPressIn={() => setPressedCard(1)}
            onPressOut={() => setPressedCard(null)}
            style={[styles.row, pressedCard === 1 && styles.cardPressed]}
          >
            <Text style={styles.boldText}>BNB Chain</Text>
            <Image
              style={styles.chabitLogo}
              source={require("../../../../assets/ChabitLogo.png")}
            />
          </Pressable>
          <Pressable
            onPress={() => navigate("/companyPay/selectCrypto/2")}
            onPressIn={() => setPressedCard(2)}
            onPressOut={() => setPressedCard(null)}
            style={[styles.row, pressedCard === 2 && styles.cardPressed]}
          >
            <Text style={styles.boldText}>Polygon</Text>
            <Image
              style={styles.chabitLogo}
              source={require("../../../../assets/ChabitLogo.png")}
            />
          </Pressable>
          <Pressable
            onPress={() => navigate("/companyPay/selectCrypto/3")}
            onPressIn={() => setPressedCard(3)}
            onPressOut={() => setPressedCard(null)}
            style={[styles.row, pressedCard === 3 && styles.cardPressed]}
          >
            <Text style={styles.boldText}>Ethereum</Text>
            <Image
              style={styles.chabitLogo}
              source={require("../../../../assets/ChabitLogo.png")}
            />
          </Pressable>
          <Pressable
            onPress={() => navigate("/companyPay/selectCrypto/4")}
            onPressIn={() => setPressedCard(4)}
            onPressOut={() => setPressedCard(null)}
            style={[styles.row, pressedCard === 4 && styles.cardPressed]}
          >
            <Text style={styles.boldText}>Solana</Text>
            <Image
              style={styles.chabitLogo}
              source={require("../../../../assets/ChabitLogo.png")}
            />
          </Pressable>
        </LinearGradient>
      </View>
      <CompanyNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 30,
    marginHorizontal: 25,
  },
  lightText: {
    color: "#fff",
    fontFamily: "CovesLight",
    textAlign: "center",
    fontSize: 25,
    marginTop: "20%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
    padding: 15,
  },
  cardPressed: {
    backgroundColor: "#FFB73B",
  },
  cardGradient: {
    borderRadius: 15,
    padding: 5,
    gap: 15,
    marginTop: "10%",
  },
  boldText: {
    fontFamily: "CovesBold",
    fontSize: 18,
    color: "#fff",
  },
  chabitLogo: {
    width: 35,
    height: 35,
  },
});

export default CompanyPay;
