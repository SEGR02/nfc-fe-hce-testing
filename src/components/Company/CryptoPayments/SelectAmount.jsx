import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import CompanyNavbar from "../CompanyNavbar";
import { LinearGradient } from "expo-linear-gradient";
import YellowButton from "../../YellowButton";
import { useTranslation } from "react-i18next";
import { getCrypto } from "../../../utils";
import { apiGetExchange } from "../../../services/apiGetExchange";

const SelectAmount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const { payload } = useParams();
  const parts = payload.split(",");
  const cryptoCurrency = getCrypto(parseInt(parts[1], 10));

  const handleNumberPress = (num) => {
    setFiatAmount((prev) => prev + num);
  };

  const handleDelete = () => {
    setFiatAmount((prev) => prev.slice(0, -1));
  };

  const getExchangeRate = async () => {
    const exchangeRate = await apiGetExchange(cryptoCurrency);
    setExchangeRate(exchangeRate);
  };

  const handleConfirm = () => {
    // Lógica para confirmar el pago
  };

  useEffect(() => {
    if (cryptoCurrency) {
      getExchangeRate();
    }
  }, []);

  useEffect(() => {
    if (fiatAmount !== "")
      if (exchangeRate > 5000)
        setCryptoAmount((fiatAmount / exchangeRate).toFixed(6) || 0);
      else setCryptoAmount((fiatAmount / exchangeRate).toFixed(3) || 0);
    else setCryptoAmount(0);
  }, [fiatAmount]);

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() =>
            navigate(`/companyPay/selectCrypto/${parseInt(parts[0], 10)}`)
          }
        >
          <Image source={require("../../../../assets/backButton.png")} />
        </TouchableOpacity>
        <View style={styles.displayContainer}>
          <LinearGradient
            colors={["#F1A539", "#996E23"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.cryptoDisplay}
          >
            <Text style={styles.cryptoAmount}>
              {cryptoAmount}{" "}
              <Text style={styles.cryptoCurrency}>{cryptoCurrency}</Text>
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={["#F1A539", "#996E23"]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.fiatDisplay}
          >
            <Text style={styles.displayText}>{fiatAmount} €</Text>
          </LinearGradient>
        </View>
        <View style={styles.keypadContainer}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "."].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  item === "⌫"
                    ? handleDelete()
                    : item === "✔"
                    ? handleConfirm()
                    : handleNumberPress(item)
                }
                disabled={item === ""}
              >
                <LinearGradient
                  colors={["#F1A539", "#996E23"]}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.keypadButton}
                >
                  <Text style={styles.keypadButtonText}>{item}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )
          )}
          <YellowButton
            link={`/companyPay/summaryToPay/${payload},${fiatAmount},${cryptoAmount},1`}
            label={t("confirm")}
          />
        </View>
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
  displayContainer: {
    alignItems: "center",
  },
  cryptoDisplay: {
    width: "60%",
    borderRadius: 40,
    marginBottom: 10,
  },
  fiatDisplay: {
    width: "90%",
    paddingVertical: 8,
    borderRadius: 42,
  },
  displayText: {
    fontSize: 48,
    textAlign: "center",
    color: "#FCFAF0",
    fontWeight: "bold",
  },
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "6%",
  },
  keypadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  keypadButtonText: {
    fontSize: 50,
    color: "#fff",
  },
  confirmButton: {
    width: "80%",
    height: 70,
    borderRadius: 35,
    backgroundColor: "#34C759",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  cryptoCurrency: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  cryptoAmount: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SelectAmount;
