import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import Navbar from "../CompanyNavbar";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-native";
import { getBlockchain, getCrypto } from "../../../utils";

const AfterPay = ({ isFailed, payload, transactionId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const parts = payload.split(",");
  const blockchain = getBlockchain(parseInt(parts[0], 10));
  const cryptoCurrency = getCrypto(parseInt(parts[1], 10));
  const fiatAmount = parseFloat(parts[2]);
  const cryptoAmount = parseFloat(parts[3]);
  const image = isFailed
    ? require("../../../../assets/failedLogo.png")
    : require("../../../../assets/completedLogo.png");

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigate("/companyPay/selectAmount")}>
          <Image
            source={require("../../../../assets/backButton.png")}
            onPress
          />
        </TouchableOpacity>
        <LinearGradient
          colors={isFailed ? ["#FF1F00", "#750E00"] : ["#3EE459", "#175221"]}
          style={styles.bgGradient}
          start={[1, 0]}
          end={[1, 1]}
        >
          <Text style={styles.normalText}>
            {isFailed ? t("payment_failed") : t("approved_payment")}
          </Text>
          <Image style={styles.logoImg} source={image} />
          <Text style={styles.fiatAmount}>{fiatAmount} €</Text>
          <Text style={styles.cryptoAmount}>
            {cryptoAmount}{" "}
            <Text style={styles.cryptoCurrency}>{cryptoCurrency}</Text>
          </Text>
          <View style={styles.blockchainRow}>
            <Text style={styles.lightText}>Blockchain</Text>
            <Text style={styles.normalText}>{blockchain || "BNB Chain"}</Text>
          </View>
        </LinearGradient>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.handleWidth}
            onPress={() =>
              navigate(isFailed ? "/companyPay/summaryToPay" : "/companyPay")
            }
          >
            <LinearGradient
              colors={["#F1A539", "#1F1B17"]}
              style={styles.button}
              start={[1, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>
                {isFailed ? t("retry") : t("new_payment")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.handleWidth}
            onPress={() =>
              navigate(
                isFailed
                  ? "/companyBalance"
                  : `/companyBalance/historic/${transactionId}`
              )
            }
          >
            <LinearGradient
              colors={["#36312B", "#1F1B17"]}
              style={styles.button}
              start={[1, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>
                {isFailed ? t("cancel") : t("see_receipt")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    marginTop: "15%",
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
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: "10%",
  },
  button: {
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17.5,
    fontFamily: "CovesBold",
  },
  handleWidth: {
    width: "45%",
  },
});

export default AfterPay;
