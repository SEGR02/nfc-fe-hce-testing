import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";

const PayWithCard = ({ card, isFailed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const image = isFailed
    ? require("../../../../assets/failedLogo.png")
    : require("../../../../assets/completedLogo.png");

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/userBalance")}>
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <LinearGradient
          colors={isFailed ? ["#FF1F00", "#750E00"] : ["#3EE459", "#175221"]}
          style={styles.bgGradient}
          start={[1, 0]}
          end={[1, 1]}
        >
          <View>
            <Image style={styles.cardImg} source={card?.cardImage} />
            <Text style={styles.editText}>
              {card?.name == null ? "Tarjeta digital" : card?.name}
            </Text>
          </View>
          <Text style={styles.normalText}>
            {isFailed ? t("payment_failed") : t("approved_payment")}
          </Text>
          <Image style={styles.logoImg} source={image} />
          <Text style={styles.fiatAmount}>35 €</Text>
          <Text style={styles.cryptoAmount}>
            38.98 <Text style={styles.cryptoCurrency}>USDT</Text>
          </Text>
          <View style={styles.blockchainRow}>
            <Text style={styles.lightText}>Blockchain</Text>
            <Text style={styles.normalText}>BNB Chain</Text>
          </View>
        </LinearGradient>
      </View>
      <Navbar />
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
  bgGradient: {
    width: "100%",
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
    marginTop: "25%",
  },
  cardImg: {
    width: 156,
    height: 126,
    resizeMode: "contain",
    marginTop: "-25%",
  },
  normalText: {
    color: "#fff",
    fontSize: 20,
  },
  logoImg: {
    marginTop: "10%",
    marginBottom: "2%",
  },
  fiatAmount: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "bold",
  },
  cryptoAmount: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: "3%",
  },
  cryptoCurrency: {
    fontSize: 40,
    fontWeight: "bold",
  },
  blockchainRow: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lightText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "CovesLight",
  },
  editText: {
    position: "absolute",
    bottom: 25,
    color: "#fff",
    fontSize: 12,
    fontFamily: "CovesBold",
    width: 156,
    textAlign: "center",
  },
});

export default PayWithCard;
