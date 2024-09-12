import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import CompanyNavbar from "../CompanyNavbar";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

const SelectCrypto = () => {
  const { t } = useTranslation();
  const [pressedCard, setPressedCard] = useState();
  const navigate = useNavigate();
  const { blockchainId } = useParams();

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/companyPay")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.lightText}>{t("select_currency")}</Text>
          <LinearGradient
            colors={["#332D22", "#242120"]}
            style={styles.cardGradient}
            start={[1, 0]}
            end={[0, 1]}
          >
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},1`)
              }
              onPressIn={() => setPressedCard(1)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 1 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>USDT</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},2`)
              }
              onPressIn={() => setPressedCard(2)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 2 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>USDC</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../..//assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},3`)
              }
              onPressIn={() => setPressedCard(3)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 3 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>CB8</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},4`)
              }
              onPressIn={() => setPressedCard(4)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 4 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>Bitcoin</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},5`)
              }
              onPressIn={() => setPressedCard(5)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 5 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>BNB</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},6`)
              }
              onPressIn={() => setPressedCard(6)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 6 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>WBNB</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},7`)
              }
              onPressIn={() => setPressedCard(7)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 7 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>TK1</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigate(`/companyPay/selectAmount/${blockchainId},8`)
              }
              onPressIn={() => setPressedCard(8)}
              onPressOut={() => setPressedCard(null)}
              style={[styles.row, pressedCard === 8 && styles.cardPressed]}
            >
              <Text style={styles.boldText}>TK2</Text>
              <Image
                style={styles.chabitLogo}
                source={require("../../../../assets/ChabitLogo.png")}
              />
            </Pressable>
          </LinearGradient>
        </ScrollView>
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
  scrollView: {
    marginBottom: "10%",
    overflow: "scroll",
  },
});

export default SelectCrypto;
