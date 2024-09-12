import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import CompanyNavbar from "../Navbar";
import { useUserData } from "../../../context/UserDataContext";
import { formatWallet } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const Exchange = () => {
  const { t } = useTranslation();
  const { originalCards } = useUserData();

  return (
    <>
      <ScrollView>
        <View style={styles.secondBox}>
          <View style={styles.bgGradient}>
            <Text style={styles.lightText}>{t("your_fiat_available")}</Text>
            <View style={styles.line}></View>
            <Text style={styles.fiatAvailable}>
              {/* {Number(
                originalCards?.[0]?.balance?.tokens?.[1]?.balance
              ).toFixed(6)}{" "}
              € */}
              12588 €
            </Text>
            <View style={styles.line}></View>
            <Text style={styles.lightText}>
              {originalCards?.[0]?.balance?.wallet
                ? formatWallet(originalCards?.[0]?.balance?.wallet)
                : null}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Image source={require("../../../../assets/buyBall.png")} />
                <Text style={styles.lightTextOnButtons}>{t("buy")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Image source={require("../../../../assets/sellBall.png")} />
                <Text style={styles.lightTextOnButtons}>{t("sell")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.buttonContainer}>
                <Image source={require("../../../../assets/depositBall.png")} />
                <Text style={styles.lightTextOnButtons}>{t("deposit")}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardsContainer}>
            <TouchableOpacity>
              <View style={styles.cardContainer}>
                <Image
                  style={styles.cardImg}
                  source={require("../../../../assets/chabitMasterCard.png")}
                />
                <Text style={styles.lightTextWithCard}>
                  {t("get_your_card")}{" "}
                  <Text style={styles.boldText}>{t("master_card_now")}</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cardContainer}>
                <Image
                  style={styles.cardImg}
                  source={require("../../../../assets/amazonGiftCard.png")}
                />
                <Text style={styles.lightTextWithCard}>
                  {t("buy_gift_cards")}{" "}
                  <Text style={styles.boldText}>{t("pay_with_crypto")}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <TouchableOpacity>
              <Image source={require("../../../../assets/f1Card.png")} />
              <Text style={styles.lightText}>
                {t("buy_your_tickets")}{" "}
                <Text style={styles.boldText}>F1 Las Vegas GP!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CompanyNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  secondBox: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight + 10,
  },
  bgGradient: {
    width: "90%",
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#00000075",
  },
  lightText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    textAlign: "center",
  },
  line: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#000",
    marginVertical: 5,
  },
  fiatAvailable: {
    fontSize: 48,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "-3%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginVertical: "7.5%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  lightTextOnButtons: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    textAlign: "center",
    marginRight: 5,
  },
  boldText: {
    fontFamily: "CovesBold",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: "5%",
  },
  lightTextWithCard: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CovesLight",
    textAlign: "center",
    maxWidth: 150,
  },
  cardImg: {
    width: Dimensions.get("window").width * 0.43,
    height: Dimensions.get("window").width * 0.273,
  },
  cardContainer: {
    alignItems: "center",
  },
});

export default Exchange;
